'use strict';

const uuid = require('uuid/v4');
const dbConnection = require('../db-connection');

class User {
    constructor({ id, name, avatar, chatsIds, contactsIds, githubId }) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.chatsIds = chatsIds;
        this.contactsIds = contactsIds;
        this.githubId = githubId;
    }

    static deserialize(data) {
        return new User(data);
    }

    static serialize() {
        return {
            id: this.id,
            name: this.name,
            avatar: this.avatar,
            chatsIds: this.chatsIds,
            githubId: this.githubId
        };
    }

    static async create(name, avatar, githubId) {
        const data = {
            name,
            avatar,
            chatsIds: [],
            contactsIds: [],
            id: uuid(),
            githubId
        };
        await dbConnection.saveUser(data);
        return this.deserialize(data);
    }

    static async findByID(id) {
        const data = await dbConnection.getUser(id);
        return data && this.deserialize(data);
    }

    static async findByGithubID(githubId) {
        const data = await dbConnection.getUserByGithubId(githubId);
        return data && this.deserialize(data);
    }

    async update(data) {
        Object.assign(this, data);
        return await dbConnection.updateUser(this);
    }
}


module.exports = User;
