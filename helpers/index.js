const nodeMailer = require("nodemailer");

const defaultEmailData = { from: "noreply@node-react.com" };

exports.sendEmail = emailData => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "dhimannitish0828@gmail.com",
      pass: "hefgqvtsigddxvjf"
    }
  });
  return transporter
    .sendMail(emailData)
    .then(info => console.log(`Message Sent: ${info.response}`))
    .catch(err => console.log(`Problem sending email: ${err}`));
};
