'use strict';

const uuid = require('uuid/v4');
const { Chat } = require('../schemas/chat');

class ChatManager {
    static async create(users, avatar) {
        const contacts = users.map(user => {
            return {
                userId: user._id,
                name: user.name,
                avatar: user.avatar
            };
        });
        const chat = new Chat({ contacts, avatar, link: uuid() });
        return await chat.save();
    }

    static async addMessageToChat(chatId, message) {
        const chat = await Chat.findById(chatId);
        chat.messages.push(message);
        return await chat.save();
    }
}

module.exports = ChatManager;
