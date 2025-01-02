const express = require('express');
const router = express.Router();
const { getAllRooms } = require('../controllers/allroomController');

router.get('/', getAllRooms);

module.exports = router;
