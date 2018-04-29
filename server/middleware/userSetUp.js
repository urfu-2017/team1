'use strict';

const dbConnection = require('../db-connection');


module.exports = () => async (req, res, next) => {
    const User = require('../model/user');
    const Chat = require('../model/chat');
    const Message = require('../model/message');

    const selfUser = new User({ name: 'test user', id: '1' });
    const otherUser = new User({ name: 'friend one', id: '2' });
    const chat = new Chat({ title: 'test chat', usersIds: [selfUser.id, otherUser.id], id: '3' });
    const chatMessages = [];
    for (let i = 0; i < 3; i++) {
        const message = new Message(
            {
                content: `test message ${i}`,
                senderId: selfUser.id,
                chatId: chat.id,
                createdAt: new Date() - i
            }
        );
        chatMessages.push(message);
    }
    chat.messages = chatMessages;
    chat.lastMessage = chatMessages[chatMessages.length - 1];

    req.user = selfUser;
    req.chats = [chat];
    req.users = [selfUser, otherUser];
    next();
    return;

    if (!req.user) {
        next();
        return;
    }

    const userId = req.user.id;
    const chats = await dbConnection.getUserChats(userId);

    const messages = await Promise.all(chats.map(c => dbConnection.getMessages(c.id, {})));
    for (let i = 0; i < chats.length; i += 1) {
        const chat = chats[i];
        chat.messages = messages[i];
        chat.lastMessage = Object.assign({}, chat.messages[chat.messages.length - 1]);
    }

    const lastMessagesUsersIds = chats.map(chat => chat.lastMessage.senderId)
        .filter(Boolean)
        .map(id => dbConnection.getUser(id));
    const lastMessagesUsers = await Promise.all(lastMessagesUsersIds);
    chats.map((chat, i) => {
        delete chat.lastMessage.senderId;
        chat.lastMessage.sender = lastMessagesUsers[i];
        return chat;
    });

    //let users = await dbConnection.getUserContacts(userId);
    let users = await dbConnection.getAllUsers({});
    req.chats = chats;
    req.users = users.filter(x => x !== null)
        .filter(x => x.id !== userId);
    next();
};
