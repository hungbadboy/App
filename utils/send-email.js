var env = process.env.NODE_ENV || "development";
var dbConfig = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var smtpTransport = require('nodemailer-smtp-transport');
var nodemailer = require('nodemailer');
module.exports = function (from, to, subject, content) {
    var transporter = nodemailer.createTransport(smtpTransport(dbConfig.send_email));
    // Template
    transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: content
    }, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent');
        }
    });
};