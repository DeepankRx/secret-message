const UserControllers = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.get('/getMessage/:userId', UserControllers.getMessages);
router.post('/sendMessage/:userId', UserControllers.postMessage);
router.get('/createUser', UserControllers.createUser);

module.exports = router;
