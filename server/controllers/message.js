'use strict';

const db = require('../db-connection');
const Message = require('../model/message');


module.exports.saveNewMessage = socket => (req, res) => {
    new Promise((resolve, reject) => {
        const { content, userId, chatId } = req.body;
        const message = Message.create(content, userId, chatId);
        resolve(db.saveMessage(message, chatId));

        return message;
    })
        .then(message => {
            socket.emit(`now-ID_${message.chatId}`, message);
            res.sendStatus(201);
            console.log('сообщение разослано');
        })
        .catch(error => {
            res.sendStatus(400);
            console.log('при передаче сообщения произошла ошибка');
        });
};
