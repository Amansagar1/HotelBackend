const express = require('express');
const router = express.Router();
const {
  createFooter,
  getFooter,
  updateFooter,
  deleteFooter,
} = require('../controllers/footerController');

// Correct route for footer
router.post('/', createFooter); // POST /api/footer
router.get('/', getFooter); // GET /api/footer
router.put('/', updateFooter); // PUT /api/footer
router.delete('/', deleteFooter); // DELETE /api/footer

module.exports = router;
