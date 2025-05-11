const nodemailer = require("nodemailer");

const subscribeMail = async (options) => {
    const imgUrl = options.imgUrl+options.imgFile
    const htmlContent = `
    <html>
    <head>
      <title>${options.subject}</title>
    </head>
    <body>
      <h1>${options.subject}</h1>
      <img src="${imgUrl}" alt="Image" style="max-width: 100%;" />
      <p>${options.message}</p>
    </body>
  </html>
  `;
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

  const emailOptions = {
    from: `${options.from}`,
    to: `${options.senderemail}`,
    subject: options.subject,
    html: htmlContent,    
  };


  await transporter.sendMail(emailOptions);
};

module.exports = subscribeMail;
