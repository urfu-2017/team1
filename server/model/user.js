'use strict';

const uuid = require('uuid/v4');
const dbConnection = require('../db-connection');

class User {
    constructor({ name, avatar, chatsIds, id, githubid = null }) {
        this.name = name;
        this.avatar = avatar;
        this.chatsIds = chatsIds;
        this.id = id;
        this.githubid = githubid;
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
            githubid: this.githubid
        };
    }

    static async create(name, avatar) {
        const data = {
            name,
            avatar,
            chatsIds: [],
            id: uuid()
        };
        await dbConnection.saveUser(data);
        return this.deserialize(data);
    }

    static async findByID(id) {
        const data = await dbConnection.getUser(id);
        return data && this.deserialize(data);
    }

    static async findByGithubID(githubid) {
        const data = await dbConnection.getUserByGithubId(githubid);
        return data && this.deserialize(data);
    }

    async addGithubID(githubid) {
        await dbConnection.saveUserGithubId(githubid, this);
    }

    async update(data) {
        Object.assign(this, data);
        return await dbConnection.updateUser(this);
    }
}


module.exports = User;
