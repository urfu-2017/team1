const router = require('express').Router();
const { ChatController } = require('./chat');
const { ContactController } = require('./contact');
const { UploadController } = require('./upload');

router.post('/chats/p2p', ChatController.p2pPost);
router.post('/chats/:id', ChatController.sendMessageToChat);
router.post('/chats/:id/:messageId/reaction', ChatController.setReactionToMessage);
router.get('/chats', ChatController.get);

router.get('/contacts', ContactController.get);

router.post('/upload/avatar', UploadController.avatar);
router.post('/upload/picture', UploadController.sendPicture);

module.exports = router;
