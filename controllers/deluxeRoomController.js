const DeluxeRoom = require("../models/DeluxeRoom");

// GET all deluxe rooms
exports.getAllDeluxeRooms = async (req, res) => {
  try {
    const rooms = await DeluxeRoom.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching deluxe rooms", error });
  }
};

// POST a new deluxe room
exports.createDeluxeRoom = async (req, res) => {
  try {
    const room = new DeluxeRoom(req.body);
    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(500).json({ message: "Error creating deluxe room", error });
  }
};

// PUT to update an existing deluxe room
exports.updateDeluxeRoom = async (req, res) => {
  try {
    const updatedRoom = await DeluxeRoom.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: "Error updating deluxe room", error });
  }
};

// DELETE a deluxe room
exports.deleteDeluxeRoom = async (req, res) => {
  try {
    await DeluxeRoom.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deluxe room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting deluxe room", error });
  }
};
