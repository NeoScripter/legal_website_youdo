require('dotenv').config();
const cors = require('cors');
app.use(cors());
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: `${process.env.EMAIL_USER}`,
        pass: `${process.env.EMAIL_PASS}`
    }
});

app.post('/send-email', (req, res) => {
    const mailOptions = {
        from: req.body.email,
        to: `${process.env.EMAIL_USER}`,
        subject: `New message from ${req.body.name}`,
        text: req.body.message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.json({ status: 'error', message: 'Email could not be sent' });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ status: 'success', message: 'Email sent successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
