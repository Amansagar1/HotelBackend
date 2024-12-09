const agenda = require('../jobs/bookingReminder'); // Import the booking reminder job

const sendBookingReminder = (user, bookingDate) => {
  // Calculate when to send the reminder (1 day before the booking date)
  const reminderDate = new Date(bookingDate);
  reminderDate.setDate(reminderDate.getDate() - 1); // 1 day before

  agenda.schedule(reminderDate, 'send booking reminder', {
    email: user.email,
    username: user.username,
    bookingDate: bookingDate,
  });
};
