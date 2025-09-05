const express = require('express');
const router = express.Router();
const creditNoteController = require('../controllers/creditNoteController');

router.post('/return', creditNoteController.createCreditNote);
// Add more routes as needed (get, list, etc.)

module.exports = router;
