import dotenv from 'dotenv';

dotenv.config();

import { createTransport, getTestMessageUrl } from 'nodemailer';
async function sendEmail() {
    // Create a transporter object using SMTP transport
    let transporter = createTransport({
        host: 'smtp.gmail.com', // Replace with your SMTP server
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SRC_EMAIL_USER, // Replace with your email
            pass: process.env.SRC_EMAIL_APP_PASS // Replace with your email password
        } 
    });

    // Setup email data
    let mailOptions = {
        from: `Andre Teixeira ${process.env.SRC_EMAIL_USER}`, // Sender address
        to: `${process.env.DST_EMAIL_USER}`, // List of recipients
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // Plain text body
        html: '<b>Hello world?</b>' // HTML body
    };

    // Send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', getTestMessageUrl(info));
}

sendEmail().catch(console.error);