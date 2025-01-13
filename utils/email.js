const transporter = require('../config/nodemailerConfig');

const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to, 
      subject,
      text, 
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return { success: true, response: info.response };
  } catch (error) {
    console.error('Error sending email: ', error);
    return { success: false, message: error.message };
  }
};

module.exports = sendEmail;
