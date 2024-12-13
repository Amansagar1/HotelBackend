// const { sendEmail } = require("../utils/emailService");

// const sendBookingEmails = async (req, res) => {
//   const { bookingDetails } = req.body;

//   // Construct email content for user
//   const userEmailContent = `
//     <h1>Booking Confirmation</h1>
//     <p>Dear ${bookingDetails.firstName} ${bookingDetails.lastName},</p>
//     <p>Thank you for booking with us! Here are your booking details:</p>
//     <ul>
//       <li>Room: ${bookingDetails.title}</li>
//       <li>Check-in: ${bookingDetails.checkIn} at ${bookingDetails.checkInTime}</li>
//       <li>Check-out: ${bookingDetails.checkOut} at ${bookingDetails.checkOutTime}</li>
//       <li>Price: ${bookingDetails.price}</li>
//     </ul>
//     <p>We look forward to hosting you!</p>
//   `;

//   // Construct email content for admin
//   const adminEmailContent = `
//     <h1>New Booking Received</h1>
//     <p>Details of the new booking:</p>
//     <ul>
//       <li>Name: ${bookingDetails.firstName} ${bookingDetails.lastName}</li>
//       <li>Phone: ${bookingDetails.phone}</li>
//       <li>Email: ${bookingDetails.email}</li>
//       <li>Room: ${bookingDetails.title}</li>
//       <li>Check-in: ${bookingDetails.checkIn} at ${bookingDetails.checkInTime}</li>
//       <li>Check-out: ${bookingDetails.checkOut} at ${bookingDetails.checkOutTime}</li>
//       <li>Price: ${bookingDetails.price}</li>
//     </ul>
//   `;

//   try {
//     // Send email to user
//     await sendEmail(bookingDetails.email, "Booking Confirmation", userEmailContent);

//     // Send email to admin
//     await sendEmail("hotelsudarshan01@gmail.com", "New Booking Received", adminEmailContent);

//     res.status(200).json({ success: true, message: "Emails sent successfully!" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error sending emails.", error });
//   }
// };

// module.exports = { sendBookingEmails };
