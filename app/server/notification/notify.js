var config = require('../../client/src/config');
const nodemailer = require('nodemailer');
var twilio = require('twilio')(config.twilioConfig.accountSid, config.twilioConfig.authToken);

class Notification_Dispatcher {

    static sendSMS(customer, subject, message){
        return twilio.api.messages
            .create({
                body: `${subject}\n\n${message}`,
                to: customer,
                from: config.twilioConfig.sendingNumber,
            }).then(function(data) {
                console.log('Customer notified');
            }).catch(function(err) {
                console.error('Could not notify customer');
                console.error(err);
            });
    };

    static sendMail(customer, mailSubject, mailBody, mailBodyhtml){

        let transporter = nodemailer.createTransport({
            service: config.emailConfig.service,
            auth: {
                user: config.emailConfig.user, // generated ethereal user
                pass: config.emailConfig.pass // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        },
        {
            from: config.emailConfig.sendingEmail
        });

        transporter.sendMail({
                to: customer,
                subject: mailSubject,
                text: mailBody, //plain text
                html: mailBodyhtml
        },
            (error,info)=>{

                if (error){
                    return console.log(error.message);
                }

                console.log("Message sent: %s", info.messageId);
        });
    };

    notifyOnTrespasser(deviceId,message){
        //search for device
        return config.userProfile.forEach(function(customer) {
            customer.devices.forEach(function(device){

                if (device.id === deviceId) {
                    //get info of model run on device
                    let model = config.modelMessage[config.modelMessage.findIndex(
                        model => model.name === device.model)];

                    if (customer.notif.phone) {
                        Notification_Dispatcher.sendSMS(customer.phone, model.subject, message);
                    }

                    if (customer.notif.email) {
                        let htmlMessage = `<h1>${model.subject}</h1><b>${message}</b>`;
                        Notification_Dispatcher.sendMail(customer.email, model.subject, message, htmlMessage);
                    }
                }
            });
        });
    };
}


module.exports = {
    Notification_Dispatcher
};