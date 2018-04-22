'use strict';

const uuid = require('uuid/v4');
const { Chat } = require('../schemas/chat');
const { User } = require('../schemas/user');

class ChatManager {
    static async create(userIds, avatar) {
        const users = await User.find({ _id: userIds });
        const contacts = users.map(user => ({
            userId: user._id,
            name: user.name,
            avatar: user.avatar
        }));
        const chat = new Chat({ contacts, avatar, link: uuid() });
        return await chat.save();
    }

    static async addMessageToChat(chat, message) {
        chat.messages.push(message);
        return await chat.save();
    }

    static async findP2PChat(sourceUserId, targetUserId) {
        return await Chat.find({
            $and: [
                { 'contacts.userId': sourceUserId },
                { 'contacts.userId': targetUserId }
            ]
        }).where({ contacts: { $size: 2 } });
    }

    static async findChatsByUserId(userId) {
        return await Chat.find({ 'contacts.userId': userId });
    }

    static async findChatById(id) {
        return await Chat.findById(id);
    }
}

module.exports = ChatManager;
