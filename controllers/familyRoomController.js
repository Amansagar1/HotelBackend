const FamilyRoom = require("../models/FamilyRoom");

// GET all Family Rooms
exports.getAllFamilyRooms = async (req, res) => {
  try {
    const rooms = await FamilyRoom.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Family Rooms", error });
  }
};


exports.getFamilyRoomByNumber = async (req, res) => {
  try {
    const roomnumber = req.params.roomnumber;  // Room number from URL parameters
    const room = await FamilyRoom.findOne({ roomnumber: roomnumber });  // Query for the room number

    if (!room) {
      return res.status(404).json({ message: "FamilyRoom room not found" });  // If room not found
    }

    res.status(200).json(room);  // Return the room data
  } catch (error) {
    res.status(500).json({ message: "Error fetching FamilyRoom room by room number", error });  // Handle server errors
  }
};
// POST a new Family Room
exports.createFamilyRoom = async (req, res) => {
  try {
    const room = new FamilyRoom(req.body);
    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(500).json({ message: "Error creating Family Room", error });
  }
};

// PUT to update an existing Family Room
exports.updateFamilyRoom = async (req, res) => {
  try {
    const updatedRoom = await FamilyRoom.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: "Error updating Family Room", error });
  }
};

// DELETE a Family Room
exports.deleteFamilyRoom = async (req, res) => {
  try {
    await FamilyRoom.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Family Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Family Room", error });
  }
};
