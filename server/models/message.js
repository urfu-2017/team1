'use strict';

const  IMessengerRepositrory = require('../messengerRepostiories/IMessengerRepository');

const messengerRepository = new IMessengerRepositrory();

const Id = 1;

class Message {
  constructor({
    content,
    senderId,
    previousMessageId,
    nextMessageId,
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
    messengerRepository.saveMessage(this);
  }

  static create({ content, senderId, previousMessageId }) {
    return new Message({ content, senderId, previousMessageId });
  }
}

module.exports = Message;
