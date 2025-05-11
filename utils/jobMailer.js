const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const { promisify } = require('util');;




const readFileAsync = promisify(fs.readFile);

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.STEP_HOST,
    port: process.env.STEP_PORT,
    service: process.env.STEP_SERVICE,
    auth: {
      user: process.env.STEP_GMAIL,
      pass: process.env.STEP_PASSWORD,
    },
    secure: false,
    requireTLS: true,
  });

  const emailBody = `${options.message}\n\nApplicant's Email: ${options.email}`;

  const emailOptions = {
    from: options.name,
    to: process.env.STEP_GMAIL,
    subject: options.subject,
    text: emailBody,
    attachments: [
      {
        filename: options.file.originalname,
        content: options.file,
      }
    ]  
  };

  // Log email options for debugging

  await transporter.sendMail(emailOptions);
};


module.exports = sendMail;
