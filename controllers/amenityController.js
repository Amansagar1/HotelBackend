const Amenity = require('../models/Amenity '); // Corrected path

// Create a new room with amenities
exports.createAmenity = async (req, res) => {
  try {
    const { roomType, size, maxOccupancy, amenities } = req.body;
    if (!roomType || !size || !maxOccupancy || !amenities) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    
    const newAmenity = new Amenity({
      roomType,
      size,
      maxOccupancy,
      amenities
    });
    
    await newAmenity.save();
    res.status(201).json({
      message: 'Room type added successfully',
      data: newAmenity
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all rooms and their amenities
exports.getAllAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.find();
    res.status(200).json(amenities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific room's amenities by ID
exports.getAmenityById = async (req, res) => {
  try {
    const amenity = await Amenity.findById(req.params.id);
    if (!amenity) {
      return res.status(404).json({ message: 'Room type not found' });
    }
    res.status(200).json(amenity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a room's amenities
exports.updateAmenity = async (req, res) => {
  try {
    const { roomType, size, maxOccupancy, amenities } = req.body;

    // You may want to check which fields are provided and only update those
    const updatedAmenity = await Amenity.findByIdAndUpdate(
      req.params.id,
      { roomType, size, maxOccupancy, amenities },
      { new: true, runValidators: true }
    );
    
    if (!updatedAmenity) {
      return res.status(404).json({ message: 'Room type not found' });
    }

    res.status(200).json({
      message: 'Room type updated successfully',
      data: updatedAmenity
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a room by ID
exports.deleteAmenity = async (req, res) => {
  try {
    const deletedAmenity = await Amenity.findByIdAndDelete(req.params.id);
    if (!deletedAmenity) {
      return res.status(404).json({ message: 'Room type not found' });
    }
    res.status(200).json({ message: 'Room type deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
