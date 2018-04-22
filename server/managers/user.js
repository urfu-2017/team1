'use strict';

const { User } = require('../schemas/user');
const { Contact } = require('../schemas/contact');

class UserManager {
    static async create(name, githubId, avatar = null) {
        const user = new User({ name, githubId, avatar });
        return await user.save();
    }

    static async update(id, options) {
        return await User.update({ _id: id }, options);
    }

    static async findById(id) {
        return await User.findById(id);
    }

    static async findByGithubId(id) {
        return await User.findOne({ githubId: id });
    }

    static async removeAll() {
        return await User.remove();
    }

    static async addContactToUser(user, addedUser) {
        const contact = new Contact({ userId: addedUser._id, name: addedUser.name, avatar: addedUser.avatar });
        user.contacts.push(contact);
        return await user.save();
    }
}

module.exports = UserManager;
