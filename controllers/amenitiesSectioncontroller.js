const Hotel = require('../models/amenitiesSectionmodel');

// Create new hotel data
exports.createHotel = async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json({ message: 'Hotel created successfully', hotel });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read hotel data
exports.getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOne(); // Assuming you only have one hotel
    res.status(200).json(hotel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update hotel data
exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOneAndUpdate({}, req.body, { new: true });
    res.status(200).json({ message: 'Hotel updated successfully', hotel });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete hotel data
exports.deleteHotel = async (req, res) => {
  try {
    await Hotel.deleteOne({});
    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
