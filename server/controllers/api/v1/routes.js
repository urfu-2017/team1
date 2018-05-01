const router = require('express').Router();
const { ChatController } = require('./chat');
const { ContactController } = require('./contact');
const { UploadController } = require('./upload');

router.post('/chats/p2p', ChatController.p2pPost);
router.post('/chats/group', ChatController.groupPost);
router.post('/chats/:id/send', ChatController.sendMessageToChat);
router.post('/chats/:id/edit', ChatController.editChat);
router.post('/chats/:id/:messageId/reaction', ChatController.setReactionToMessage);
router.get('/chats', ChatController.get);

router.get('/invite/:id', ChatController.invite);

router.get('/contacts', ContactController.get);

router.post('/upload/avatar', UploadController.avatar);

module.exports = router;
