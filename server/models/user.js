'use strict';

const repository = require('../messengerRepostiories/FakeRepository');

let Id = 1;

class User {
    constructor({ name, avatar }) {
        this.name = name;
        this.avatar = avatar;
        this.chatsId = [];
    }

        // todo
        // в моделях chat, message мы создаём id перед методом save, почему тут решили по-другому?
        this.createId();
    save() {
        this.createId();
        messengerRepository.saveUser(this);
    }

    createId() {
        // здесь будет guid и/или что то связанное со временем
        Id += 1;
        this.id = Id;
    }

    addChat(chatId) {
        this.chatsId.push(chatId);
    }

    static findUserIdByGithubId(githubId) {
        return messengerRepository.getUserIdByGithubId(githubId);
    }

    static findUserById(userId) {
        return messengerRepository.getUser(userId);
    }
}

module.exports = User;
