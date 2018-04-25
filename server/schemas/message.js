const mongoose = require('mongoose');

const { Schema } = mongoose;

const senderSchema = new Schema({
    userId: { type: Schema.ObjectId, required: true },
    name: { type: String, required: true },
    avatar: { type: String }
});

const messageSchema = new Schema({
    sender: senderSchema,
    message: { type: String, required: true },
    metadata: { type: Object },
    reactions: [String]
}, { timestamps: true });

module.exports = { Message: mongoose.model('Message', messageSchema), messageSchema };
