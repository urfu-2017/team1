'use strict';

const dbConnection = require('../db-connection');

class User {
    constructor({ id, name, avatarUrl, githubId }) {
        this.id = id;
        this.name = name;
        this.avatarUrl = avatarUrl;
        this.githubId = githubId;
    }

    static deserialize(data) {
        return new User(data);
    }

    static serialize() {
        return {
            id: this.id,
            name: this.name,
            avatarUrl: this.avatarUrl,
            githubId: this.githubId
        };
    }

    static async create(username, avatarUrl, githubId) {
        const user = await dbConnection.createUser(username, avatarUrl, githubId);
        console.log('Create user');
        console.log('%%%%%%%%%%%%%%%%');
        console.log(user);
        console.log('%%%%%%%%%%%%%%%%');

        return this.deserialize(user);
    }

    static async findByID(id) {

        const data = await dbConnection.findUserByID(id);
        console.log('find user by id');
        console.log(data);
        return data && this.deserialize(data);
    }

    static async findByGithubID(githubId) {
        const user = await dbConnection.findUserByGithubID(githubId);
        console.log('Get user by github id');
        console.log(user);
        return user && this.deserialize(user);
    }

    async update(data) {
        //todo:
        //Object.assign(this, data);
        //return await dbConnection.updateUser(this);
    }
}


module.exports = User;
