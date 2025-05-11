// contactUsController.js

const sendMail = require('../utils/sendMail');
const jobmailer = require("../utils/jobMailer");

exports.createMailer = async (req, res) => {
    const { name, email, message, subject } = req.body;

    try {
        const mailer = await sendMail({ name, email, message, subject }); // Pass as an object

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createjob = async (req, res) => {


    try {
        const file = req.file
        const { name, email, message, subject } = req.body;
        const mailer = await jobmailer({ name, email, message, subject, file }); // Pass as an object

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
