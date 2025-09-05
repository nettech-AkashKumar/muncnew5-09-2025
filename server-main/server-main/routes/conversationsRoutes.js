const express = require('express');
const router = express.Router();
const conversationsControllers = require('../controllers/conversationsControllers');
// const auth = require('../middleware/auth');

router.get('/:userId',  conversationsControllers.getConversations);

module.exports = router; 