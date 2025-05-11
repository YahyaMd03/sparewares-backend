const nodeMailer = require('nodemailer');

  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,  //true for 465 port // false for 587
    auth: {
      user: 'anwar.duskcoder@gmail.com',
      pass: 'wbfo cwik hdjy wvvi'
    }
  });

const sendEmail = async (to, subject, message) => {
    try {
        const mailOptions = {
            from: 'anwar.duskcoder@gmail.co', // sender address
            to: to, // list of receivers
            subject: 'OTP', // Subject line
            text: `Hello ${to.split('@')[0]}`, // plain text body
            html: `This your OTP <b>${subject}</b><br>Thanks and Regards<br>SpareWares` // html body
          };
  
      await transporter.sendMail(mailOptions);
    } catch (error) {
    }
  };

module.exports = {
    sendEmail,
  };