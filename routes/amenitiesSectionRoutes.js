const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/amenitiesSectioncontroller');

// Define CRUD routes for hotel
router.post('/hotel', hotelController.createHotel); // Create
router.get('/hotel', hotelController.getHotel); // Read
router.put('/hotel', hotelController.updateHotel); // Update
router.delete('/hotel', hotelController.deleteHotel); // Delete

module.exports = router;
