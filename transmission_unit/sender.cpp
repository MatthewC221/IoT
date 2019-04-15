#include <stdio.h>
#include <time.h>
#include <wiringPi.h>
#include <lmic.h>
#include <hal.h>
#include <local_hal.h>

//maximum length of the payload in chars
#define MAX_DATA_LENGTH 51
//the max runtime for the script before it kills itself
#define MAX_RUNTIME 60

// LoRaWAN Application identifier (AppEUI)
// Not used in this example
static const u1_t APPEUI[8]  = { 0x02, 0x00, 0x00, 0x00, 0x00, 0xEE, 0xFF, 0xC0 };

// LoRaWAN DevEUI, unique device ID (LSBF)
// Not used in this example
static const u1_t DEVEUI[8]  = { 0x42, 0x42, 0x45, 0x67, 0x89, 0xAB, 0xCD, 0xEF };

// LoRaWAN NwkSKey, network session key 
// Use this key for The Things Network
static const u1_t DEVKEY[16] = { 0xBA, 0xB1, 0xAC, 0x69, 0x0A, 0x08, 0x2D, 0x14, 0x36, 0x25, 0xAA, 0xB8, 0xAC, 0xCA, 0x4A, 0xC2};

// LoRaWAN AppSKey, application session key
// Use this key to get your data decrypted by The Things Network
static const u1_t ARTKEY[16] = { 0x14, 0xF1, 0xB9, 0x5C, 0x9C, 0xFF, 0x8A, 0x9C, 0x9E, 0xCD, 0xF7, 0x36, 0xA2, 0xE5, 0x38, 0xE1};

// LoRaWAN end-device address (DevAddr)
// See http://thethingsnetwork.org/wiki/AddressSpace
static const u4_t DEVADDR = 0x260013DB ; // <-- Change this address for every node!

//////////////////////////////////////////////////
// APPLICATION CALLBACKS
//////////////////////////////////////////////////

// provide application router ID (8 bytes, LSBF)
void os_getArtEui (u1_t* buf) {
	memcpy(buf, APPEUI, 8);
}

// provide device ID (8 bytes, LSBF)
void os_getDevEui (u1_t* buf) {
	memcpy(buf, DEVEUI, 8);
}

// provide device key (16 bytes)
void os_getDevKey (u1_t* buf) {
	memcpy(buf, DEVKEY, 16);
}

// queue of jobs
static osjob_t jobs;
// store the message to be sent
u1_t data_to_send[MAX_DATA_LENGTH];
// store the length of the message
int data_to_send_length;
// an exit condition for the program if it is unset
int running = 1;

// Pin mapping
lmic_pinmap pins = {
	.nss = 6,
	.rxtx = UNUSED_PIN, // Not connected on RFM92/RFM95
	.rst = 0,  // Needed on RFM92/RFM95
	.dio = {7,4,5}
};


/*
	- called when runtime reached MAX_RUN to limit number of instances running 
	- output "1007" to stdout
*/
static void maxrt_reached_exit (osjob_t* j) {
	fprintf(stdout, "1007"); 
	// unset running to allow program to exit
	running = 0;
}

/*
	- pass the message to the LMIC library and ready to be sent out
	- schedule another transmission to the queue if the device is busy
	- truncate the message if it is too large
*/
static void do_send (osjob_t* j) {
	time_t t=time(NULL);
	// Show TX channel (channel numbers are local to LMIC)
	// Check if there is not a current TX/RX job running
	if (LMIC.opmode & (1 << 7)) {
		// device not ready
		// schedule another transmission
		os_setTimedCallback(j, os_getTime()+sec2osticks(MAX_RUNTIME/3), do_send);
	} else {
		// message length check
		// truncate if needed
		if (data_to_send_length > MAX_DATA_LENGTH) {
			data_to_send_length = MAX_DATA_LENGTH;
		}
		// send out the message using LMIC_setTxData2
		// check return value to make sure message length is within the limit
		if (LMIC_setTxData2(1, data_to_send, data_to_send_length, 0) == -2) {
			// data length too large
			// shouldnt happen as the message will be truncated	
			fprintf(stdout, "1002");
		}
	}
}

/*
	- result for the transmission
	- adds a delayed transmission to the queue if the previous transmission failed
	- output "1001" to stdout if message is sent succesfully
*/
void onEvent (ev_t ev) {
	switch(ev) {
	case EV_TXCOMPLETE:
		// message succesfully sent out
		fprintf(stdout, "1001");  
		if (LMIC.dataLen) { 
			// data received in rx slot after tx
			// not used currently
		}
		// unset running to allow program to exit
		running = 0;
		break;
	default:
		// message not sent out succesfully
		// schedule another transmission
		os_setTimedCallback(&jobs, os_getTime()+sec2osticks(MAX_RUNTIME/3), do_send);
		break;
	}
}

void setup () {
	// LMIC init
	wiringPiSetup();

	os_init();
	// Reset the MAC state. Session and pending data transfers will be discarded.
	LMIC_reset();
	// Set static session parameters. Instead of dynamically establishing a session 
	// by joining the network, precomputed session parameters are be provided.
	LMIC_setSession (0x1, DEVADDR, (u1_t*)DEVKEY, (u1_t*)ARTKEY);
	// Disable data rate adaptation
	LMIC_setAdrMode(0);
	// Disable link check validation
	LMIC_setLinkCheckMode(0);
	// Disable beacon tracking
	LMIC_disableTracking ();
	// Stop listening for downstream data (periodical reception)
	LMIC_stopPingable();
	// Set data rate and transmit power (note: txpow seems to be ignored by the library)
	LMIC_setDrTxpow(DR_SF7,14);
}

int main (int argc, char** argv) {
	if (argc != 2) {
		printf("usage: %s <dataToSend>\n", argv[0]); 
		return 1;
	}

	// load message and length
	int i=0;
	while (argv[1][i]) {
		data_to_send[i]=argv[1][i];
		i++;
	}
	data_to_send[i]='\0';
	data_to_send_length = i;

	setup();

	// first try transmission
	do_send(&jobs);
	// schedule a timed exit
	os_setTimedCallback(&jobs, os_getTime()+sec2osticks(MAX_RUNTIME), maxrt_reached_exit);
	// excute the jobs queued while running is set
	while (running) {
		os_runloop_once();
	}
	return 0;
}


