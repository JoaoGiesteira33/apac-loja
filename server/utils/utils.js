const nodemailer = require('nodemailer');

async function send_email(email, subject, text) {
    try{
        console.log("Email:",process.env.EMAIL);
        console.log("Service:",process.env.SERVICE);
        console.log("Port:",process.env.EMAIL_PORT);
        console.log("Secure:",process.env.SECURE);
        console.log("User:",process.env.USER_EMAIL);
        console.log("Pass:",process.env.USER_PASS);

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL,
            service: process.env.SERVICE,
            port: process.env.EMAIL_PORT,
            secure: process.env.SECURE,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS
            }
        });
        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: email,
            subject: subject,
            text: text
        });
        
        console.log("Email sent successfuly");
    } catch(error){
        console.log("Email not sent", error);
    }
}

module.exports = {
    send_email
}
