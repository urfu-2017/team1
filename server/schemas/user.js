const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: { type: String, required: true },
    avatar: { type: String },
    chatsIds: { type: [Schema.ObjectId] },
    contactsIds: { type: [Schema.ObjectId] },
    githubId: { type: String, required: true, index: { unique: true } }
});

module.exports = mongoose.model('User', userSchema); 