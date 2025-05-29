const express = require('express');
const router = express.Router();
const { healthCheck } = require('../controllers/botController');

router.get('/', healthCheck);

module.exports = router;
