const mongoose = require('mongoose');

const { Schema } = mongoose;

const contactSchema = new Schema({
    userId: { type: Schema.ObjectId },
    name: { type: String, required: true },
    avatar: String
});

module.exports = { Contact: mongoose.model('Contact', contactSchema), contactSchema };
