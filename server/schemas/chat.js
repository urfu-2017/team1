const mongoose = require('mongoose');

const { Schema } = mongoose;
const { messageSchema } = require('./message');
const { contactSchema } = require('./contact');

const chatSchema = new Schema({
    name: { type: String },
    messages: [messageSchema],
    lastMessage: messageSchema,
    contacts: [contactSchema],
    avatar: { type: String },
    link: { type: String, unique: true }
}, { timestamps: true });

module.exports = { Chat: mongoose.model('Chat', chatSchema) };
