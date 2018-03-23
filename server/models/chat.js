'use strict';

const IMessengerRepository = require('../messengerRepostiories/IMessengerRepository');

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
        IMessengerRepository.saveChat(this);
    }

    getUsers() {
        return this.usersId.map(userId => IMessengerRepository.getUser(userId));
    }

    getMessagesByRange(oldestMessageAvailableToUser, count) {
    // oldestMessageAvailableToUser -
    // перед этим сообщением еще нет информации о более старых сообщениях
        const messageId = oldestMessageAvailableToUser.id;
        IMessengerRepository.getMessagesByRange(this.id, messageId, count);
    }

    addMessage(messageId) {
        this.tail = this.head;
        this.head = messageId;
    }

    addUser(id) {
        this.usersId.push(id);
    }

    getUnreadMessages() {
        return IMessengerRepository.getAllMessages(this.id)
            .filter(message => !message.isRead);
    }

    static create({ name, picture, usersId }) {
        return new Chat({ name, picture, usersId });
    }

    static getAllChatesByUserId(userId) {
        return IMessengerRepository.getAllChats(userId);
    }

    createId() {
        // здесь будет guid и/или что то связанное со временем
        Id += 1;
        this.id = Id;
    }
}

module.exports = Chat;
