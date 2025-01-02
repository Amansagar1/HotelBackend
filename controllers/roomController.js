const Room = require('../models/Room');
const createError = require('http-errors');
const DeluxeRoom = require('../models/DeluxeRoom');
const SuperDeluxeRoom = require('../models/SuperDeluxeRoom');
const FamilyRoom = require('../models/FamilyRoom');
const Booking = require('../models/Booking');
// // Create a new room type
// exports.createRoom = async (req, res, next) => {
//   try {
//     const { type, size, occupancy, amenities, description,price,beds,rating, image } = req.body;

//     const newRoom = new Room({ type, size, occupancy, amenities,description, price, beds, rating, image });
//     const savedRoom = await newRoom.save();

//     res.status(201).json({ message: 'Room created successfully', data: savedRoom });
//   } catch (error) {
//     next(createError(400, error.message));
//   }
// };
exports.createRoom = async (req, res, next) => {
  try {
    // Destructure the fields from the request body
    const { type, size, occupancy, amenities, description, price, beds, rating, image } = req.body;

    // Validate required fields
    if (!type || !size || !occupancy || !description || !price || !beds || !rating || !image) {
      return next(createError(400, 'All fields are required'));
    }

    // Check if the room type already exists
    const existingRoom = await Room.findOne({ type });
    if (existingRoom) {
      return next(createError(400, 'Room type already exists'));
    }

    const newRoom = new Room({ type, size, occupancy, amenities, description, price, beds, rating, image });
    const savedRoom = await newRoom.save();

    res.status(201).json({ message: 'Room created successfully', data: savedRoom });
  } catch (error) {
    next(createError(400, error.message));
  }
};
// Get all room types
exports.getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Get a room by type
exports.getRoomByType = async (req, res, next) => {
  try {
    const room = await Room.findOne({ type: req.params.type });

    if (!room) return next(createError(404, 'Room not found'));

    res.status(200).json(room);
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Update a room
exports.updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findOneAndUpdate(
      { type: req.params.type },
      req.body,
      { new: true }
    );

    if (!updatedRoom) return next(createError(404, 'Room not found'));

    res.status(200).json({ message: 'Room updated successfully', data: updatedRoom });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Delete a room
exports.deleteRoom = async (req, res, next) => {
  try {
    const deletedRoom = await Room.findOneAndDelete({ type: req.params.type });

    if (!deletedRoom) return next(createError(404, 'Room not found'));

    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    next(createError(500, error.message));
  }
};




// Check room availability
// Helper function to convert dd/mm/yy to yyyy-mm-dd
const convertToDate = (date) => {
  const [day, month, year] = date.split('/');
  const fullYear = year.length === 2 ? '20' + year : year; // Handle 2-digit years
  return new Date(`${fullYear}-${month}-${day}`); // Format it as yyyy-mm-dd for Date object
};

exports.checkRoomAvailability = async (req, res, next) => {
  try {
    const { checkIn, checkOut, roomType } = req.query;

    // Validate that both checkIn and checkOut are provided
    if (!checkIn || !checkOut) {
      return res.status(400).json({ success: false, message: 'Check-in and check-out dates are required.' });
    }

    // Convert the dates from dd/mm/yy to yyyy-mm-dd
    const parsedCheckIn = convertToDate(checkIn);
    const parsedCheckOut = convertToDate(checkOut);

    // Ensure check-in date is before check-out date
    if (parsedCheckIn >= parsedCheckOut) {
      return res.status(400).json({ success: false, message: 'Check-in date must be before check-out date.' });
    }

    // Validate room type
    const validRoomTypes = ['DeluxeRoom', 'SuperDeluxeRoom', 'FamilyRoom'];
    if (!validRoomTypes.includes(roomType)) {
      return res.status(400).json({ success: false, message: `Invalid room type. Must be one of: ${validRoomTypes.join(', ')}` });
    }

    // Map roomType to the corresponding model
    const RoomModel = {
      DeluxeRoom,
      SuperDeluxeRoom,
      FamilyRoom,
    }[roomType];

    if (!RoomModel) {
      return res.status(400).json({ success: false, message: 'Invalid room type model mapping.' });
    }

    // Find bookings that overlap with the requested date range
    const overlappingBookings = await Booking.find({
      roomType,
      $or: [
        { checkIn: { $lt: parsedCheckOut }, checkOut: { $gt: parsedCheckIn } },
      ],
    }).select('room');

    // Get booked room IDs
    const bookedRoomIds = overlappingBookings.map((booking) => booking.room);

    // Find available rooms that are not booked
    const availableRooms = await RoomModel.find({
      _id: { $nin: bookedRoomIds },
    });

    // Respond with the available rooms
    return res.status(200).json({ success: true, data: availableRooms });
  } catch (error) {
    next(error); // Use centralized error handler
  }
};
