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
