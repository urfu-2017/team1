'use strict';

const uuid = require('uuid/v4');
const { Chat } = require('../schemas/chat');
const { User } = require('../schemas/user');

class ChatManager {
    static async create(userIds, avatar, type) {
        const users = await User.find({ _id: userIds });
        const contacts = users.map(user => ({
            userId: user._id,
            name: user.name,
            avatar: user.avatar
        }));
        const chat = new Chat({ contacts, avatar, link: uuid(), type });
        return await chat.save();
    }

    static async update(chatId, name, userIds) {
        const users = await User.find({ _id: userIds });
        const contacts = users.map(user => ({
            userId: user._id,
            name: user.name,
            avatar: user.avatar
        }));
        await Chat.updateOne({ _id: chatId }, { contacts, name });
        return await Chat.findOne({ _id: chatId });
    }

    static async addMessageToChat(chat, message) {
        chat.messages.push(message);
        return await chat.save();
    }

    static async findByInviteId(inviteId) {
        return await Chat.findOne({ _id: inviteId });
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

    static async findChatByMessageId(chatId, messageId) {
        return await Chat.findOne({ _id: chatId, 'messages._id': messageId });
    }

    static async addReactionToMessage(chat, messageId, reaction) {
        const message = chat.messages.find(m => messageId == m._id);
        const reactionIndex = message.reactions.findIndex(r => r.userId == reaction.userId);
        if (reactionIndex !== -1) {
            message.reactions.splice(reactionIndex, 1);
        } else {
            message.reactions.push(reaction);
        }
        return await chat.save();
    }
}

module.exports = ChatManager;
