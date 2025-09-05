// Get all invoices or by invoiceId
const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.post('/create', salesController.createSale);
router.get('/next-reference', salesController.getNextReferenceNumber);

router.get('/', salesController.getSales);
router.get('/allinvoice', salesController.getAllInvoice);

// Stock History and Payment History routes (must be above :id)
router.get('/stockhistory', salesController.getStockHistory);
router.get('/paymenthistory', salesController.getPaymentHistory);

router.get('/:id', salesController.getSaleById);
router.put('/:id', salesController.updateSale);
router.delete('/:id', salesController.deleteSale);


module.exports = router;
