'use strict';

const Repository = require('../messengerRepostiories/FakeRepository');
const createUuid = require('./uuid');


class Message {
    constructor({ content, creatorId }) {
        this.content = content;
        this.creatorId = creatorId;
        this.createAt = new Date().getTime();
        this.previousMessageId = null;
        this.nextMessageId = null;
    }

    save() {
        this.id = createUuid();
        Repository.saveMessage(this);
    }
}

module.exports = Message;
