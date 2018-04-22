'use strict';

const ChatManager = require('../../../managers/chat');
const { Message } = require('../../../schemas/message');


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

    static async sendMessageToChat(req, res) {
        const { user } = req;
        const chatId = req.params.id;
        const chat = await ChatManager.findChatById(chatId);
        if (!chat) {
            res.status(404).send({});
            return;
        }

        if (chat.contacts.find(contact => contact.userId === user._id) != null) {
            res.status(400).send({ error: 'Слыш, ты рамсы попутал? Тебе сюда нельзя' });
        } else {
            const message = new Message(req.body.message);
            await ChatManager.addMessageToChat(chat, message);
            res.status(200).send(message);
        }
    }
}

module.exports = { ChatController };
