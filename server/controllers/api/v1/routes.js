const router = require('express').Router();
const { ChatController } = require('./chat');

router.post('/chat', ChatController.post);

module.exports = router;
