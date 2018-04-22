'use strict';

const UserModel = require('../schemas/user');

class User {
    static async create(name, githubId, avatar = null) {
        const user = new UserModel({ name, githubId, avatar });
        return await user.save();
    }
    
    static async update(id, options) {
        return await UserModel.update({ _id: id }, options);
    }

    static async findById(id) {
        return await UserModel.findById(id);
    }

    static async findByGithubId(id) {
        return await UserModel.findOne({ githubId: id });
    }

    static async removeAll() {
        return await UserModel.remove();
    }
}

module.exports = User;
