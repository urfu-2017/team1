'use strict';

const uuid = require('uuid/v4');


class Chat {
    constructor({ title, picture, usersIds, id }) {
        this.title = title;
        this.picture = picture || 'default';
        this.usersIds = usersIds;
        this.id = id;
    }

    static create(title, picture, usersIds) {
        return new Chat({
            title,
            picture,
            usersIds,
            id: uuid()
        });
    }
}


module.exports = Chat;
