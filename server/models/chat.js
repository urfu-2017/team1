'use strict';

const Repository = require('../messengerRepostiories/FakeRepository');
const createUuid = require('./uuid');


class Chat {
    constructor({ name, picture, usersId }) {
        this.name = name;
        this.picture = picture || 'default';
        this.usersId = usersId;
        this.usersIdToIdLastReadMessage = {};
        this.firstMessageId = null;
        this.lastMessageId = null;
    }

    save() {
        this.id = createUuid();
        Repository.saveChat(this);
    }

    addUser(id) {
        this.usersId.push(id);
    }

    getUsers() {
        return this.usersId.map(userId => Repository.getUser(userId));
    }

    addMessage(messageId) {
        if (this.lastMessageId === null && this.firstMessageId === null) {
            this.lastMessageId = messageId;
            this.firstMessageId = messageId;
        } else {
            const penultimateMessage = Repository.getLastMessage(this.id);
            penultimateMessage.nextMessageId = messageId;
            const lastMessage = Repository.getMessage(messageId);
            lastMessage.previousMessageId = penultimateMessage.id;
            this.lastMessageId = messageId;
        }
    }

    static getChatById(chatId) {
        return Repository.getChat(chatId);
    }

    static getAllChatsByUserId(userId) {
        return Repository.getUser(userId).chatsId.map(chatId => Repository.getChat(chatId));
    }

    visitChat(userId) {
        this.usersIdToIdLastReadMessage[userId] = Repository.getLastMessage(this.id).id;
    }

    getMessagesOlder({ lastMessage, messagesCount }) {
        return Repository.getMessagesOlder(this.id, { lastMessage, messagesCount });
    }

    getUnreadMessages(userId) {
        return Repository.getUnreadMessages(this.id, userId);
    }
}

module.exports = Chat;
