const Room = require('../models/Room');
const createError = require('http-errors');

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
