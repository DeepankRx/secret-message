const StatsController = require('../controllers/stats');
const express = require('express');
const router = express.Router();

router.get('/getStats', StatsController.getStats);
router.get('/updateStats', StatsController.updateStats);

module.exports = router;
