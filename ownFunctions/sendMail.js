import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter = nodemailer.createTransport({
    service: 'Gmail', // you can replace this with your email service
    auth: {
        user: 'gyaanhub8@gmail.com', // your email address
        pass: process.env.EMAIL_APP_PASSWORD // your email password
    }
});

// console.log(process.env.EMAIL_APP_PASSWORD)

export default transporter