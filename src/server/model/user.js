'use strict';

const uuid = require('uuid/v4');
const dbConnection = require('../db-connection');

class User {
    constructor({ id, username, avatar, githubId }) {
        this.id = id;
        this.username = username;
        this.avatar = avatar;
        this.githubId = githubId;
    }

    static deserialize(data) {
        return new User(data);
    }

    static serialize() {
        return {
            id: this.id,
            username: this.username,
            avatar: this.avatar,
            githubId: this.githubId
        };
    }

    static async create(username, avatar, githubId) {
        const user = await dbConnection.createUser(username, avatar, githubId);
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
