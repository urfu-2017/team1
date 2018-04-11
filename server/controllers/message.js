'use strict';

const Message = require('../model/message');
const dbConnection = require('../db-connection');


module.exports.saveNewMessage = socket => async (req, res) => {
    const { content, chatId, senderId } = req.body.message;
    const message = Message.create(content, senderId, chatId);
    try {
        await dbConnection.saveMessage(message);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
        return;
    }
    socket.emit(`now-${message.chatId}`, {
        message
    });
};
