'use strict';

const Chat = require('../model/chat');
const dbConnection = require('../db-connection');

module.exports.saveNewMessage = socket => async (req, res) => {
    console.log('сохранили чат');
    res.sendStatus(201);
    /*
    const { content, chatId, senderId } = req.body.message;
    const chat = Message.create(content, senderId, chatId);
    try {
        await dbConnection.saveChat(message);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
        return;
    }
    socket.emit(`now-${message.chatId}`, {
        message
    });*/
};