'use strict';

const hruDbRest = require('../repository/hruDb');

const Id = 1;

class Message {
  constructor({
    content, senderId, previousMessageId, nextMessageId,
  }) {
    this.content = content;
    this.senderId = senderId;
    this.createAt = new Date().getTime();
    this.isRead = false;
    this.previousMessageId = previousMessageId;
    this.nextMessageId = null;
  }

  save() {
    this.id = Id++;
    const value = JSON.stringify(this);
    hruDbRest.saveMessage({ key: this.Id, value });
  }

  static create({ content, senderId, previousMessageId }) {
    return new Message({ content, senderId, previousMessageId });
  }
}
