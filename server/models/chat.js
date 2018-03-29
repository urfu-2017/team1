'use strict';

const repository = require('../messengerRepostiories/FakeRepository');

let Id = 1;

class Chat {
    constructor({ name, picture, usersId }) {
        this.name = name;
        this.picture = picture || 'default';
        this.usersId = usersId;
        this.head = null;
        this.tail = null;
    }

    save() {
        this.createId();
        repository.saveChat(this);
    }

    createId() {
        // здесь будет guid и/или что то связанное со временем
        Id += 1;
        this.id = Id;
    }

    getUsers() {
        return this.usersId.map(userId => repository.getUser(userId));
    }

    getMessagesByRange(oldestMessageAvailableToUser, count) {
    // oldestMessageAvailableToUser -
    // перед этим сообщением еще нет информации о более старых сообщениях
        const messageId = oldestMessageAvailableToUser.id;
        repository.getMessagesByRange(this.id, messageId, count);
    }

    addMessage(messageId) {
        if (tail === null && head === null) {
            this.tail = messageId;
            this.head = messageId;
        } else {
            tail = messageId;
        }
    }

    addUser(id) {
        this.usersId.push(id);
    }

    getUnreadMessages() {
        return repository.getAllMessages(this.id)
            .filter(message => !message.isRead);
    }

    static create({ name, picture, usersId }) {
        return new Chat({ name, picture, usersId });
    }

    static getAllChatesByUserId(userId) {
        return repository.getAllChats(userId);
    }

    static getChatById(chatId) {
        return messengerRepository.getChat(chatId);
    }
}

module.exports = Chat;
