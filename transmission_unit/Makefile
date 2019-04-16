CFLAGS=-Ilmic
LDFLAGS=-lwiringPi

sender: sender.cpp
	cd lmic && $(MAKE)
	$(CC) $(CFLAGS) -o sender sender.cpp lmic/*.o $(LDFLAGS)

all: sender

.PHONY: clean

clean:
	rm -f *.o sender
