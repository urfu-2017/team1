const mongoose = require('mongoose');

const { Schema } = mongoose;

const { contactSchema } = require('./contact');

const userSchema = new Schema({
    name: { type: String, required: true },
    avatar: { type: String },
    contacts: { type: [contactSchema] },
    githubId: { type: String, required: true, index: { unique: true } }
});

module.exports = { User: mongoose.model('User', userSchema) };
