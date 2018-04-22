const router = require('express').Router();
const { ChatController } = require('./chat');

router.post('/chats/p2p', ChatController.p2pPost);
router.post('/chats', ChatController.get);

module.exports = router;
