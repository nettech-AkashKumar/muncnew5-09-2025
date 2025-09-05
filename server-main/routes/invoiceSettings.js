const express = require('express');
const router = express.Router();
const controller = require('../controllers/invoiceSettingsController');

router.post('/', controller.createInvoiceSettings);
router.get('/', controller.getInvoiceSettings);
router.put('/:id', controller.updateInvoiceSettings);

module.exports = router;
