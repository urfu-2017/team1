const mongoose = require('mongoose');

const { Schema } = mongoose;

const alarClockSchema = new Schema({
    time: String,
    music: Number,
    repeat: Boolean
});

module.exports = { AlarmClock: mongoose.model('AlarmClock', alarClockSchema), alarClockSchema };
