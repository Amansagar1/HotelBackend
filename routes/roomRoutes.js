const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const { checkRoomAvailability } = require('../controllers/roomController');
// Create a room
router.post('/', roomController.createRoom);

// Get all rooms
router.get('/', roomController.getAllRooms);

// Get room by type
router.get('/:type', roomController.getRoomByType);

// Update a room by type
router.put('/:type', roomController.updateRoom);

// Delete a room by type
router.delete('/:type', roomController.deleteRoom);

router.get('/availability', checkRoomAvailability);

module.exports = router;
