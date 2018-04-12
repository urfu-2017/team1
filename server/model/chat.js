'use strict';

const uuid = require('uuid/v4');


class Chat {
    constructor({ title, picture, usersIds, id, creatorId }) {
        this.title = title;
        this.picture = picture;
        this.usersIds = usersIds;
        this.id = id;
        this.creatorId = creatorId;
    }

    static create(title, usersIds, creatorId, picture = null) {
        return new Chat({
            title,
            picture,
            usersIds,
            creatorId,
            id: uuid()
        });
    }
}


module.exports = Chat;
