'use strict';

const uuid = require('uuid/v4');


class User {
    constructor({ name, githubId, avatar, chatsIds, id }) {
        this.name = name;
        this.githubId = githubId;
        this.avatar = avatar;
        this.chatsIds = chatsIds;
        this.id = id;
    }

    static create(name, githubId, avatar) {
        return new User({
            name,
            githubId,
            avatar,
            chatsIds: [],
            id: uuid()
        });
    }
}


module.exports = User;
