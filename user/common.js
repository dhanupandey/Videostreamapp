// wnzdmdvvejugxjlu
const nodemailer = require('nodemailer');

exports.mail = function(gmailId){

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dhanupandey161b074@gmail.com',
            pass: 'wnzdmdvvejugxjlu'
        }
    });
    
    let mailDetails = {
        from: 'dhanupandey161b074@gmail.com',
        to: gmailId,
        subject: 'Test mail',
        text: 'Node.js testing mail'
    };
    
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });

}


exports.mailPassword = function(body){

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dhanupandey161b074@gmail.com',
            pass: 'wnzdmdvvejugxjlu'
        }
    });
    
    let mailDetails = {
        from: 'dhanupandey161b074@gmail.com',
        to: body.email,
        subject: 'Test mail',
        text: body.password
    };
    
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });

}

