'use strict';

const Message = require('../model/message');
const dbConnection = require('../db-connection');


module.exports.saveNewMessage = async (req, res) => {
    const { content, chatId, senderId } = req.body.message;
    const message = Message.create(content, senderId, chatId);
    await dbConnection.saveMessage(message);
    res.sendStatus(201);
    console.log(message);
};
