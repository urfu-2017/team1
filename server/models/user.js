'use strict';

const repository = require('../messengerRepostiories/FakeRepository');

let Id = 1;

class User {
    constructor({ name, avatar }) {
        this.name = name;
        this.avatar = avatar;
        this.chatsId = [];
    }

    addChat(chatId) {
        // todo
        // в моделях chat, message мы создаём id перед методом save, почему тут решили по-другому?
        this.createId();
        this.chatsId.push(chatId);
    }

    save() {
        repository.saveUser(this);
    }

    createId() {
        // здесь будет guid и/или что то связанное со временем
        Id += 1;
        this.id = Id;
    }
}

module.exports = User;
