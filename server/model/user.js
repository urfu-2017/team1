'use strict';

const uuid = require('uuid/v4');


class User {
    constructor({ name, avatar, chatsIds, id }) {
        this.name = name;
        this.avatar = avatar;
        this.chatsIds = chatsIds;
        this.id = id;
    }

    static create(name, avatar) {
        return new User({
            name,
            avatar,
            chatsIds: [],
            id: uuid()
        });
    }
}


module.exports = User;
