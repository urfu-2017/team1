'use strict';

const { Contact } = require('../schemas/contact');


class ContactManager {
    static async removeAll() {
        return await Contact.remove();
    }
}

module.exports = ContactManager;
