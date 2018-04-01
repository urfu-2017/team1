'use strict';

const uuid = require('uuid/v4');


class Message {
    constructor({ content, senderId, createdAt, chatId, id }) {
        this.content = content;
        this.senderId = senderId;
        this.createdAt = createdAt;
        this.chatId = chatId;
        this.id = id;
    }

    static create(content, senderId) {
        return new Message({
            content,
            senderId,
            createdAt: new Date().getTime(),
            id: uuid()
        });
    }
}

module.exports = Message;
