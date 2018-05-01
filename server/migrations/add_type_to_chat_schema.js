const mongoose = require('mongoose');

require('dotenv').config();

const { Chat } = require('../schemas/chat');

mongoose.connect(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}?authSource=admin`, {
    auth: {
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD
    }
});

(async () => {
    await Chat.schema.add({
        type: { type: String }
    });
    await Chat.find({ contacts: { $size: 2 } }).update({ type: 'p2p' });
    await Chat.find({ $where: 'this.contacts.length > 2' }).update({ type: 'group' });
})().then(() => {
    mongoose.disconnect();
});
