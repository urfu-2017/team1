'use strict';

const IMessengerRepositrory = require('../messengerRepostiories/IMessengerRepository');

const messengerRepository = new IMessengerRepositrory();
let Id = 1;

class User {
    constructor({ name, avatar }) {
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

    createId() {
        // здесь будет guid и/или что то связанное со временем
        Id += 1;
        this.id = Id;
    }

    static findUserIdByGithubId(githubId) {
        return messengerRepository.getUserIdByGithubId(githubId);
    }

    static findUserById(userId) {
        return messengerRepository.getUser(userId);
    }
}

module.exports = User;
