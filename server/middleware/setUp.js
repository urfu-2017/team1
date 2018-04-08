'use strict';

const dbConnection = require('../db-connection');


module.exports = () => async (req, res, next) => {
    const userId = req.user.id;
    // нужно уточнить, что собой представляет req.user
    // кажется, это то, что пришло из кук
    // но тогда информации о чатах доверять нельзя
    const user = await dbConnection.getUser(userId);
    const chats = await dbConnection.getUserChats(userId);
    // шквар какой-то :(
    const [messages, users] = await Promise.all([
        Promise.all(chats.map(c => dbConnection.getMessages(c.id))),
        Promise.all(chats.map(c => dbConnection.getAllChatUsers(c.id)))
    ]);
    const usersMap = new Map(
        users.reduce((acc, val) => acc.concat(val), []) // flatten
            .map(u => [u.id, u])
    );
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
    }
    req.locals.data = {
        user,
        chats
    };
    next();
};
