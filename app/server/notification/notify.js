var config = require('../../client/src/config');
var customers = require('./userData.json');
const nodemailer = require('nodemailer');
var twilio = require('twilio')(config.twilioConfig.accountSid, config.twilioConfig.authToken);

class notify {


    formatHtmlMessage(modelSubject, message){
        return `<h1>${modelSubject}</h1><b>${message}</b>`
    }

    sendSMS(to, subject, message){
        return twilio.api.messages
            .create({
                body: `${subject}\n\n${message}`,
                to: to,
                from: config.twilioConfig.sendingNumber,
            }).then(function(data) {
                console.log('Customer notified');
            }).catch(function(err) {
                console.error('Could not notify customer');
                console.error(err);
            });
    };

    sendMail(customer, mailSubject, mailBody, mailBodyhtml){

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
            from: config.emailConfig.sendFrom
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
        return customers.forEach(function(customer) {
            customer.devices.forEach(function(device){

                if (device.id === deviceId) {
                    //get info of model run on device
                    let model = config.modelMessage[config.modelMessage.findIndex(
                        model => model.name === device.model)];

                    if (customer.notif.sms) {
                        notify.prototype.sendSMS(customer.phoneNumber, model.subject, message);
                    }

                    if (customer.notif.email) {
                        notify.prototype.sendMail(customer.email, model.subject, message,
                            notify.prototype.formatHtmlMessage(model.subject, message));
                    }
                }
            });
        });
    };
}

module.exports = {
    notify
};

