'use strict';

const dbConnection = require('../db-connection');


module.exports = () => async (req, res, next) => {
    if (!req.user) {
        next();
        return;
    }
    const userId = req.user.id;
    const chats = await dbConnection.getUserChats(userId);

    const messages = await Promise.all(chats.map(c => dbConnection.getMessages(c.id)));
    for (let i = 0; i < chats.length; i += 1) {
        const chat = chats[i];
        chat.messages = messages[i];
        chat.lastMessage = Object.assign({}, chat.messages[chat.messages.length - 1]);
    }

    const lastMessagesUsersIds = chats.map(chat => chat.lastMessage.senderId)
        .map(id => dbConnection.getUser(id));
    const lastMessagesUsers = await Promise.all(lastMessagesUsersIds);
    chats.map((chat, i) => {
        delete chat.lastMessage.senderId;
        chat.lastMessage.sender = lastMessagesUsers[i];
        return chat;
    });

    req.chats = chats;
    next();
};
