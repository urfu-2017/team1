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

    static async create(name, avatar) {
        const data = {
            name,
            avatar,
            chatsIds: [],
            id: uuid()
        }
        await dbConnection.saveUser(data);
        return this.deserialize(data);
    }

    static async findByID(id) {
        return this.deserialize(await dbConnection.getUser(id));
    }

    static async findByGithubID(githubid) {
        return this.deserialize(await dbConnection.getUserByGithubId(githubid));
    }

    async addGithubID (githubid) {
        await dbConnection.saveUserGithubId(githubid, this);
    }
}


module.exports = User;
