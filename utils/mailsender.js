const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: '127.0.0.1',
    port: 25,
    secure: false,
    ignoreTLS: true
});

function sendEmail(from, to, subject, text) {
    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('[LOG] Email sent: ' + info.response);
        }
    });
}

module.exports = { sendEmail }