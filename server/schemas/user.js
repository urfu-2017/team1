const mongoose = require('mongoose');

const { Schema } = mongoose;

const { contactSchema } = require('./contact');
const { alarmClockSchema } = require('./alarmClock');

const userSchema = new Schema({
    name: { type: String, required: true },
    avatar: { type: String },
    contacts: { type: [contactSchema] },
    alarmClocks: { type: [alarmClockSchema] },
    githubId: { type: String, required: true, index: { unique: true } }
});

module.exports = { User: mongoose.model('User', userSchema) };
