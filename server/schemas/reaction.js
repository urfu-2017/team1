const mongoose = require('mongoose');

const { Schema } = mongoose;

const reactionSchema = new Schema({
    reaction: { type: String, required: true },
    userId: { type: Schema.ObjectId, required: true }
});

module.exports = { Reaction: mongoose.model('Reaction', reactionSchema), reactionSchema };
