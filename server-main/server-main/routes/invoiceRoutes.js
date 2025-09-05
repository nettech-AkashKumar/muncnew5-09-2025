const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// Create invoice
router.post('/', invoiceController.createInvoice);
// Get all invoices (search, pagination, filter)
router.get('/allinvoice', invoiceController.getAllInvoice);
router.get('/', invoiceController.getAllInvoices);
// Get invoice by ID
router.get('/:id', invoiceController.getInvoiceById);
// Update invoice
router.put('/:id', invoiceController.updateInvoice);
// Delete invoice
router.delete('/:id', invoiceController.deleteInvoice);


// Print invoice
router.get('/print/:invoiceId', invoiceController.printSalesInvoice);
// Download PDF
router.get('/pdf/:invoiceId', invoiceController.downloadSalesInvoicePDF);


module.exports = router;
