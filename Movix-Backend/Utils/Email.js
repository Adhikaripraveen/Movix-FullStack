const nodeMailer = require("nodemailer");
const {
  EMAIL_PORT,
  EMAIL_HOST,
  EMAIL_USER,
  EMAIL_PASSWORD,
} = require("../Config/index");

const sendEmail = async (option) => {
	console.log(EMAIL_HOST)
  const transporter = nodeMailer.createTransport({
    service: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, 		
    },
  });
  const emailOptions = {
    from: "Movix Support <support@Movix.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };
  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
