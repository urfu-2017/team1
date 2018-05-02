'use strict';

const ChatManager = require('../../../managers/chat');
const { Message } = require('../../../schemas/message');
const { Reaction } = require('../../../schemas/reaction');
const { User } = require('../../../schemas/user');

const { getMetadata } = require('../../../lib/metadata');

const { generateAndUpload } = require('../../../lib/avatar-generation');

const _ = require('lodash');

class ChatController {
    static async get(req, res) {
        const userId = req.user.id;
        const chats = await ChatManager.findChatsByUserId(userId);
        let userIds = [];
        _.forEach(chats, chat => {
            userIds = userIds.concat(chat.contacts.map(c => c.userId));
        });
        const usersMap = {};
        _.forEach(await User.find({ _id: userIds }), user => {
            usersMap[user._id] = user;
        });
        _.forEach(chats, chat => {
            _.forEach(chat.contacts, contact => {
                const user = usersMap[contact.userId];
                contact.avatar = user.avatar;
                contact.name = user.name;
            });
            _.forEach(chat.messages, message => {
                const user = usersMap[message.sender.userId];
                message.sender.avatar = user.avatar;
                message.sender.name = user.name;
            });
        });
        res.status(200).send(chats);
    }

    static async p2pPost(req, res) {
        const { targetUserId } = req.body;
        const p2pChats = await ChatManager.findP2PChat(req.user.id, targetUserId);
        if (p2pChats.length === 0) {
            const chat = await ChatManager.create([req.user.id, targetUserId], null, null, 'p2p');
            res.status(200).send(chat);
        } else {
            res.status(200).send(p2pChats[0]);
        }
    }

    static async groupPost(req, res) {
        const { userIds, name } = req.body;
        userIds.push(req.user._id);
        const data = await generateAndUpload(Math.random().toString());
        const chat = await ChatManager.create(userIds, data.secure_url, name, 'group');
        res.status(200).send(chat);
    }

    static async editChat(req, res) {
        const chat = await ChatManager.findChatById(req.params.id);
        if (chat.type !== 'group') {
            res.status(400).send({ errors: ['Можно редактировать только групповые чаты'] });
        } else {
            const { name, userIds } = req.body;
            const updatedChat = await ChatManager.update(chat._id, name, userIds);
            res.status(200).send(updatedChat);
        }
    }

    static async invite(req, res) {
        const { user } = req;
        const chat = await ChatManager.findByInviteId(req.params.id);
        if (!chat || chat.type !== 'group') {
            res.status(404).send();
            return;
        }
        if (!chat.contacts.find(c => c.userId === user._id)) {
            await ChatManager.addUserToChat(chat, user);
        }
        res.redirect('/');
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
            // Защищаем от инъекций отправителя
            const sender = {
                userId: user._id,
                name: user.name,
                avatar: user.avatar
            };
            let messageData = req.body.message;
            if (!messageData.message) {
                res.status(400).send({ error: 'Сообщение не может быть пустым' });
                return;
            }
            messageData = Object.assign({}, messageData, { metadata: await getMetadata(messageData.message) });
            let message = new Message(Object.assign({}, messageData, { sender }));
            const savedChat = await ChatManager.addMessageToChat(chat, message);
            message = savedChat.messages.find(m => m._id === message._id);

            req.ioServer.in(chat._id).emit('message', {
                message
            });

            res.status(200).send(message);
        }
    }

    static async setReactionToMessage(req, res) {
        const { user } = req;
        const { id, messageId } = req.params;
        const chat = await ChatManager.findChatByMessageId(id, messageId);
        if (!chat) {
            res.status(404).send({});
        }
        if (chat.contacts.find(contact => contact.userId === user._id) != null) {
            res.status(400).send({ error: 'Эээ, ты чьи сообщения оцениваешь?!' });
        } else {
            const { reactionId } = req.body;
            const reaction = new Reaction(Object.assign({}, { reaction: reactionId, userId: user._id }));
            const savedChat = await ChatManager.addReactionToMessage(chat, messageId, reaction);
            const message = savedChat.messages.find(m => m._id == messageId);

            req.ioServer.in(chat._id).emit('message', {
                message
            });

            res.status(200).send(message);
        }
    }
}

module.exports = { ChatController };
