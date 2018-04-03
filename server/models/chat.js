'use strict';

const uuid = require('uuid/v4');


class Chat {
    constructor({ title, picture, usersIds, id }) {
        this.title = title;
        this.picture = picture;
        this.usersIds = usersIds;
        this.id = id;
    }

    static create(title, usersIds, picture = null) {
        return new Chat({
            title,
            picture,
            usersIds,
            id: uuid()
        });
    }
}


module.exports = Chat;
