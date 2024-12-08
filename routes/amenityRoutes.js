const express = require('express');
const router = express.Router();
const amenitiesController = require('../controllers/amenityController');

// POST: Add a new room with amenities
router.post('/', amenitiesController.createAmenity);

// GET: Retrieve all rooms and their amenities
router.get('/', amenitiesController.getAllAmenities);

// GET: Retrieve a specific room's amenities by ID
router.get('/:id', amenitiesController.getAmenityById);

// PUT: Update a room's amenities
router.put('/:id', amenitiesController.updateAmenity);

// DELETE: Delete a room by ID
router.delete('/:id', amenitiesController.deleteAmenity);

module.exports = router;
