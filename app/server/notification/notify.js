var config = require('../../client/src/config');
var customers = require('/userData.json');

const nodemailer = require('nodemailer');
var twilio = require('twilio')(config.twilioConfig.accountSid, config.twilioConfig.authToken);

let testAccount = nodemailer.createTestAccount();

var formatSubject = 'TRESSPASSER!!!!!'

function formatHtmlMessage(message){
    `<h1>TRESSPASSER!!!!</h1><b>${message}</b>`
}

function sendSMS(to, message){
    return twilio.api.messages
        .create({
            body: message,
            to: to,
            from: config.twilioConfig.sendingNumber,
        });
}

function sendMail(customer, mailSubject, mailBody, mailBodyhtml){
    let transporter = nodemailer.createTransport({
        host: config.emailConfig.host,
        port: config.emailConfig.port,
        secure: config.emailConfig.secure,
        //service: "Gmail",
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
        }
    });

    transporter.sendMail({
        from: config.emailConfig.sendFrom,
        to: customer,
        subject: mailSubject,
        text: mailBody, //plain text
        html: mailBodyhtml
    }, (error,info));

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}


function notifyOnTrespasser(deviceId,message){
    customers.forEach(function(customers) {
        if (customers.device.includes(deviceId)){
            sendSMS(customers.phoneNumber,message);
            sendMail(customers.email,formatSubject,message,formatHtmlMessage(message));
        }
    });
}

/*
EXAMPLE:
        this.sendMail(
            'Cust_Cattle@example.com',
            formatSubject,
            payload.payload_raw.toString(),
            formatHtmlMessage(payload.payload_raw.toString())
        )

        this.sendSMS(
            +61468440474,
            '${formatSubject}\n${payload.payload_raw.toString()}'
        )

*/