'use strict';

const hruDbRest = require('../repository/hruDb');

class User {
  constructor( {id, name, avatar}) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.chatsId = [];
  }

  addChat(chatId) {
      this.chatsId.push(chatId);
  }

  save() {
    const value = JSON.stringify(this);
    hruDbRest.saveMessage({ key: this.Id, value });
  }
}
