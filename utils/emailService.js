// const nodemailer = require("nodemailer");
// require("dotenv").config(); // To load environment variables

// // Create a reusable transporter object using the default SMTP transport
// const transporter = nodemailer.createTransport({
//   service: "gmail", // You can use Gmail or any other service
//   auth: {
//     user: process.env.EMAIL_USER, // Your email address
//     pass: process.env.EMAIL_PASS, // Your email password or app-specific password
//   },
// });

// // Function to send email
// const sendEmail = async (to, subject, htmlContent) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER, // Sender address
//     to, // Receiver address
//     subject, // Subject line
//     html: htmlContent, // HTML body
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent: " + info.response);
//     return info;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw error;
//   }
// };

// module.exports = { sendEmail };
