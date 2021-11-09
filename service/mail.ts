import nodemailer from 'nodemailer';
import Promise from 'promise';
import htmlToText from 'html-to-text';
import { ethereal } from '../config/ethereal';

export const mailModule = {
    sendTransportMail(options) {

        return new Promise((resolve, reject) => {
            // if env variable available then production
            // hardcore the data for now
            const transporter = nodemailer.createTransport({
                host: ethereal.host,
                port: ethereal.port,
                auth: {
                    user: ethereal.username,
                    pass: ethereal.password
                }
            });
            const text = htmlToText.fromString(options.html, {
                wordwrap: 30
            });
            const mailOptions = {
                from: '"Insight Mirror"<noreply@kcube.org>',
                to: options.email,
                subject: options.subject,
                text,
                html: options.html
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return reject(error);
                }
                console.log('message id', info.messageId);
                console.log('preview url', nodemailer.getTestMessageUrl(info));
                return resolve({ message: 'Reset Email has sent to your inbox' });
            });
        });
    },


    // async sendMail(contact, callback) {
    //     const transporter = nodemailer.createTransport({
    //         service: 'gmail',
    //         host: "smtp.gmail.com",
    //         port: 587,
    //         secure: false,
    //         auth: {
    //             user: '',
    //             pass: ''
    //         }
    //     });

    //     const mailOptions = {
    //         from: 'Insight Mirror<noreply@kcube.org>',
    //         to: contact.email,
    //         subject: "Wellcome 👻",
    //         html: `<h1>Hi ${contact.first_name}</h1><br>
    //       <h4>Thanks for joining us</h4>`
    //     };


    //     const info = await transporter.sendMail(mailOptions);
    //     callback(info);
    // }
}