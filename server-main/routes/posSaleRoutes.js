const express = require('express');
const router = express.Router();
const {
  createPosSale,
  getPosSales,
  getPosSaleById,
  getSalesSummary
} = require('../controllers/posSaleController');
const { verifyToken } = require('../middleware/Authentication/verifyToken');

// Apply authentication middleware to all routes
router.use(verifyToken);

// Create new POS sale
router.post('/create', createPosSale);

// Get all POS sales with pagination
router.get('/transactions', getPosSales);

// Get single POS sale by ID
router.get('/:id', getPosSaleById);

// Get sales summary/statistics
router.get('/summary/daily', getSalesSummary);

module.exports = router; 