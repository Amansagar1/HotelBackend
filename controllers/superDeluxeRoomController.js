const SuperDeluxeRoom = require("../models/SuperDeluxeRoom");

// GET all Super Deluxe Rooms
exports.getAllSuperDeluxeRooms = async (req, res) => {
  try {
    const rooms = await SuperDeluxeRoom.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Super Deluxe Rooms", error });
  }
};



exports.getSuperDeluxeRoomById = async (req, res) => {
  try {
    const roomId = req.params.id; 
    const room = await SuperDeluxeRoom.findById(roomId); 

    if (!room) {
      return res.status(404).json({ message: "Super Deluxe Room not found" }); 
    }
    res.status(200).json(room); 
  } catch (error) {
    res.status(500).json({
      message: "Error fetching Super Deluxe Room by ID",
      error: error.message, 
    });
  }
};

// POST a new Super Deluxe Room
exports.createSuperDeluxeRoom = async (req, res) => {
  try {
    const room = new SuperDeluxeRoom(req.body);
    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(500).json({ message: "Error creating Super Deluxe Room", error });
  }
};

// PUT to update an existing Super Deluxe Room
exports.updateSuperDeluxeRoom = async (req, res) => {
  try {
    const updatedRoom = await SuperDeluxeRoom.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: "Error updating Super Deluxe Room", error });
  }
};

// DELETE a Super Deluxe Room
exports.deleteSuperDeluxeRoom = async (req, res) => {
  try {
    await SuperDeluxeRoom.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Super Deluxe Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Super Deluxe Room", error });
  }
};
