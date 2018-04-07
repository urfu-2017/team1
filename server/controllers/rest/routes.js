'use strict';

const express = require('express');

const { getChat, getMessages, getUser, getAllChatInfo } = require('./handlers');

const router = express.Router();


router.get('/user/:id', getUser);
router.get('/chat/:id', getChat);
router.get('/chat/:id/messages', getMessages);
router.get('/chat/:id/everything', getAllChatInfo);


module.exports = router;
