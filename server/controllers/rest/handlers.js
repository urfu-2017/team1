'use strict';

const dbConnection = require('../../db-connection');


const _getEntityById = getter => async (req, res) => {
    const { id } = req.params;
    const result = await getter(id);
    res.json(result);
};


const _checkUserAccessToChat = (user, chatId) => user.chatsIds.includes(chatId);


exports.getChat = _getEntityById(dbConnection.getChat);


exports.getUser = _getEntityById(dbConnection.getUser);


exports.getMessages = async (req, res) => {
    const chatId = req.params.id;
    // Check if user has rights to read chat
    if (_checkUserAccessToChat(req.user, chatId)) {
        res.sendStatus(403);
        return;
    }
    const { fromTimestamp, toTimestamp, limit } = req.query;
    const messages = await dbConnection
        .getMessages(chatId, fromTimestamp, toTimestamp, limit);
    res.json(messages);
};


exports.getAllChatInfo = async (req, res) => {
    const chatId = req.params.id;
    if (_checkUserAccessToChat(req.user, chatId)) {
        res.sendStatus(403);
        return;
    }
    // Performance optimization: see db implementation
    const messagesPromise = dbConnection.getMessages(chatId);
    const chat = await dbConnection.getChat(chatId);
    const [messages, users] = await Promise.all([
        messagesPromise,
        dbConnection.getAllChatUsers(chatId)
    ]);

    const result = {
        chat,
        messages,
        users
    };
    res.json(result);
};
