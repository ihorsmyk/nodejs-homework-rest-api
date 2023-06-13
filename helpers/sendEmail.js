const sendgrid = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, EMAIL } = process.env;
sendgrid.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data, from = EMAIL) => {
  try {
    const mail = { ...data, from };
    await sendgrid.send(mail);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  sendEmail,
};
