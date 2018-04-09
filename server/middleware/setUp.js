'use strict';

const dbConnection = require('../db-connection');


module.exports = () => async (req, res, next) => {
    console.log(req.user);
    if (!req.user) {
        next();
        return;
    }
    const userId = req.user.id;
    /* { name: 'Lyapa96',
    githubId: '11576176',
    avatar: 'https://avatars1.githubusercontent.com/u/11576176?v=4',
    chatsIds: [],
    id: '718c6f82-f46c-4804-80dc-6e29cc5ebe0e' } */
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
    req.locals.data = {
        user,
        chats
    };
    next();
};
