// WebScrapper
const sgMail = require("@sendgrid/mail");

const sendGridAPIKey = process.env.sendGridAPIKey;

sgMail.setApiKey(sendGridAPIKey);

const sendContent = async (from, to, subject, content) => {
  sgMail.send({
    from: from,
    to: to,
    subject: subject,
    html: content
  });
};

module.exports.sendContent = sendContent;
