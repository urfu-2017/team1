'use strict';

class Message {
    constructor({ content, senderId, chatId, createdAt, metadata }) {
        this.content = content;
        this.senderId = senderId;
        this.chatId = chatId;
        this.createdAt = createdAt;
        this.metadata = metadata;
    }

    static create(content, senderId, chatId, metadata) {
        return new Message({
            content,
            senderId,
            createdAt: new Date().getTime(),
            chatId,
            metadata
        });
    }
}

module.exports = Message;
