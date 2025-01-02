const express = require('express');
const router = express.Router();
const aboutusController = require('../controllers/aboutus');

router.post('/', aboutusController.createAboutus);
router.get('/', aboutusController.getAboutus);
router.put('/:id', aboutusController.updateAboutus);
router.delete('/:id', aboutusController.deleteAboutus);

module.exports = router;
