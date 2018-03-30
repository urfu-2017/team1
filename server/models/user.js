'use strict';

const Repository = require('../messengerRepostiories/FakeRepository');
const createUuid = require('./uuid');


class User {
    constructor({ name, avatar, githubId }) {
        this.name = name;
        this.avatar = avatar;
        this.chatsId = [];
        this.githubId = githubId;
    }

    save() {
        this.id = createUuid();
        Repository.saveUser(this);
    }

    addChat(chatId) {
        this.chatsId.push(chatId);
    }

    static findUserIdByGithubId(githubId) {
        return Repository.getUserIdByGithubId(githubId);
    }

    static findUserById(userId) {
        return Repository.getUser(userId);
    }
}

module.exports = User;
