'use strict';

const dbConnection = require('../db-connection');


module.exports = () => async (req, res, next) => {
    if (!req.user) {
        console.log(2);
        
        next();
        return;
    }
    console.log(3);
    
    const userId = req.user.id;
    const chats = await dbConnection.getUserChats(userId);

    const [messages, users] = await Promise.all([
        Promise.all(chats.map(c => dbConnection.getMessages(c.id))),
        Promise.all(chats.map(c => dbConnection.getAllChatUsers(c.id)))
    ]);

    const usersMap = new Map(users.reduce((acc, val) => acc.concat(val), []) // flatten
        .map(u => [u.id, u]));
    for (let i = 0; i < chats.length; i += 1) {
        const chat = chats[i];
        delete chat.usersIds;
        chat.users = users[i];
        chat.messages = messages[i]
            .map(msg => {
                msg.sender = usersMap.get(msg.senderId);
                delete msg.senderId;
                return msg;
            });
        chat.lastMessage = chat.messages[chat.messages.length - 1];
    }

    req.chats = chats;
    next();
};
