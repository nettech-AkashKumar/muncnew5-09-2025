
const express = require("express");
const { saveBalanceSheet, getBalanceSheets } = require("../controllers/balanceSheetController");

const router = express.Router();

router.post("/", saveBalanceSheet);
router.get("/", getBalanceSheets);

module.exports = router;
