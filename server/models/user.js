'use strict';

const IMessengerRepository = require('../messengerRepostiories/IMessengerRepository');

let Id = 1;

class User {
    constructor({ name, avatar }) {
        this.name = name;
        this.avatar = avatar;
        this.chatsId = [];
    }

    addChat(chatId) {
        this.createId();
        this.chatsId.push(chatId);
    }

    save() {
        IMessengerRepository.saveUser(this);
    }

    createId() {
        // здесь будет guid и/или что то связанное со временем
        Id += 1;
        this.id = Id;
    }
}

module.exports = User;
