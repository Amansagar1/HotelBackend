const DeluxeRoom = require('../models/DeluxeRoom');
const SuperDeluxeRoom = require('../models/SuperDeluxeRoom');
const FamilyRoom = require('../models/FamilyRoom');
const Booking = require('../models/Booking');

async function checkRoomAvailability(req, res, next) {
  try {
    const { checkInDate, checkOutDate, roomType } = req.query;

    // Validate inputs
    if (!checkInDate || !checkOutDate) {
      return res.status(400).json({ message: 'Check-in and check-out dates are required.' });
    }

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      return res.status(400).json({ message: 'Check-in date must be before check-out date.' });
    }

    const validRoomTypes = ['DeluxeRoom', 'SuperDeluxeRoom', 'FamilyRoom'];
    if (!validRoomTypes.includes(roomType)) {
      return res.status(400).json({ message: `Invalid room type. Must be one of: ${validRoomTypes.join(', ')}` });
    }

    // Map roomType to the corresponding model
    const RoomModel = {
      DeluxeRoom,
      SuperDeluxeRoom,
      FamilyRoom,
    }[roomType];

    // Find bookings that overlap with the requested date range
    const overlappingBookings = await Booking.find({
      roomType,
      $or: [
        { checkInDate: { $lt: new Date(checkOutDate) }, checkOutDate: { $gt: new Date(checkInDate) } },
      ],
    }).select('room');

    // Get booked room IDs
    const bookedRoomIds = overlappingBookings.map((booking) => booking.room);

    // Find available rooms
    const availableRooms = await RoomModel.find({
      _id: { $nin: bookedRoomIds },
    });

    // Respond with the available rooms
    res.status(200).json({ availableRooms });
  } catch (error) {
    next(error); // Use centralized error handler
  }
}

module.exports = { checkRoomAvailability };
