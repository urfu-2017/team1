'use strict';

class Message {
    constructor({ content, senderId, chatId, createdAt }) {
        this.content = content;
        this.senderId = senderId;
        this.chatId = chatId;
        this.createdAt = createdAt;
    }

    static create(content, senderId, chatId) {
        return new Message({
            content,
            senderId,
            createdAt: new Date().getTime(),
            chatId
        });
    }
}

module.exports = Message;
