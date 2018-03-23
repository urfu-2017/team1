'use strict';

const  IMessengerRepositrory = require('../messengerRepostiories/IMessengerRepository');

const messengerRepository = new IMessengerRepositrory();

class User {
  constructor({ id, name, avatar }) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.chatsId = [];
  }

  addChat(chatId) {
    this.chatsId.push(chatId);
  }

  save() {
    messengerRepository.saveUser(this);
  }
}

module.exports = User;
