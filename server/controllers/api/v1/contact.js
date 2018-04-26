const UserManager = require('../../../managers/user');

class ContactController {
    static async get(req, res) {
        const { user } = req;
        const users = await UserManager.findUsersButExcludeUser(user);
        const contacts = users.map(u => ({ userId: u._id, name: u.name, avatar: u.avatar }));

        res.status(200).send({ contacts });
    }
}

module.exports = { ContactController };
