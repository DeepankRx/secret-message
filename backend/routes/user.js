const UserControllers = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.get('/getMessage/:userId', UserControllers.getMessages);
router.post('/sendMessage/:userId', UserControllers.postMessage);
router.post('/createUser', UserControllers.createUser);
router.get('/getUser/:userId', UserControllers.getUser);
module.exports = router;
