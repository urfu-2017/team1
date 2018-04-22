'use strict';

const ChatManager = require('../../../managers/chat');


class ChatController {
    static async get(req, res) {
        const userId = req.user.id;
        const chats = await ChatManager.findChatsByUserId(userId);
        res.status(200).send(chats);
    }

    static async p2pPost(req, res) {
        const { targetUserId } = req.body;
        const p2pChats = await ChatManager.findP2PChat(req.user.id, targetUserId);
        if (p2pChats.length === 0) {
            const chat = await ChatManager.create([req.user.id, targetUserId], null);
            res.status(200).send(chat);
        } else {
            res.status(200).send(p2pChats[0]);
        }
    }
}

module.exports = { ChatController };
