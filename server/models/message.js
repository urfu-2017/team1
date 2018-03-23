'use strict';

const IMessengerRepository = require('../messengerRepostiories/IMessengerRepository');

let Id = 1;

class Message {
    constructor({ content, senderId, previousMessageId }) {
        this.content = content;
        this.senderId = senderId;
        this.createAt = new Date().getTime();
        this.isRead = false;
        this.previousMessageId = previousMessageId;
        this.nextMessageId = null;
    }

    save() {
        this.createId();
        IMessengerRepository.saveMessage(this);
    }

    static create({ content, senderId, previousMessageId }) {
        return new Message({ content, senderId, previousMessageId });
    }

    createId() {
        // здесь будет guid и/или что то связанное со временем
        Id += 1;
        this.id = Id;
    }
}

module.exports = Message;
