const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: "samashushka7@gmail.com" };
  try {
    await sgMail.send(mail);
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = sendEmail;
