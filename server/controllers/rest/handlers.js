'use strict';

const dbConnection = require('../../db-connection');
const Message = require('../../model/message');
const Chat = require('../../model/chat');
const User = require('../../model/user');

const handlers = {};
let io = null;


const _getEntityById = getter => async (req, res) => {
    const { id } = req.params;
    const result = await getter(id);
    res.json(result);
};


const _checkUserAccessToChat = (user, chatId) => user.chatsIds.includes(chatId);


handlers.getChat = _getEntityById(id => dbConnection.getChat(id));


handlers.getUser = _getEntityById(id => dbConnection.getUser(id));


handlers.getChatMessages = async (req, res) => {
    const chatId = req.params.id;
    // Check if user has rights to read chat
    if (!_checkUserAccessToChat(req.user, chatId)) {
        res.sendStatus(401);
        return;
    }
    const { from, to, limit } = req.query;
    const messages = await dbConnection
        .getMessages(chatId, {
            from,
            to,
            limit
        });
    res.json(messages);
};


handlers.getAllChatInfo = async (req, res) => {
    const chatId = req.params.id;
    if (!_checkUserAccessToChat(req.user, chatId)) {
        res.sendStatus(401);
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


const _getWithRestrictions = getter => async (req, res) => {
    const restrictions = { ...req.query };
    const users = await getter(restrictions);
    res.json(users);
};


handlers.getAllUsers = _getWithRestrictions(restr => dbConnection.getAllUsers(restr));

handlers.getAllChats = _getWithRestrictions(restr => dbConnection.getAllChats(restr));


handlers.createMessage = async (req, res) => {
    const chatId = req.params.id;
    if (!_checkUserAccessToChat(req.user, chatId)) {
        res.sendStatus(401);
        return;
    }
    const message = Message.create(req.body.message.content, req.user.id, chatId);
    const outcome = await dbConnection.saveMessage(message, chatId);
    if (outcome !== null) {
        res.sendStatus(201);
        io.emit(`${req.chatSocketPrefix}-${chatId}`, {
            message
        });
    } else {
        res.sendStatus(500);
    }
};


const awaitAllWithOutcome = async (...promises) => (await Promise.all(promises))
    .reduce((acc, curr) => acc && curr, true);


handlers.createChat = async (req, res) => {
    const { title, picture } = req.body.chat;
    const currentUser = req.user;
    const chat = Chat.create(title, [currentUser.id], currentUser.id, picture);
    currentUser.chatsIds.push(chat.id);
    const outcome = await awaitAllWithOutcome(
        dbConnection.saveChat(chat),
        currentUser.update({})
    );
    if (outcome !== null) {
        res.json(chat);
    } else {
        res.sendStatus(500);
    }
};


handlers.startChatWithUser = async (req, res) => {
    const currentUser = req.user;
    const otherUser = await User.findByID(req.params.id);
    if (otherUser === null) {
        res.sendStatus(404);
        return;
    }

    const chat = Chat.create(
        otherUser.name,
        [req.user.id, otherUser.id],
        req.user.id,
        otherUser.avatar
    );
    currentUser.chatsIds.push(chat.id);
    otherUser.chatsIds.push(chat.id);
    const outcome = await awaitAllWithOutcome(
        dbConnection.saveChat(chat),
        currentUser.update({}),
        otherUser.update({})
    );
    // TODO: remove when fixed
    chat.lastMessage = Message.create({ text: 'Hi!' }, currentUser.id, chat.id);
    chat.lastMessage.sender = currentUser;
    if (outcome !== null) {
        console.log('emitting');
        for (let id of [currentUser.id, otherUser.id]) {
            console.log(`${req.newChatsSocketPrefix}-${id}`);
            io.emit(`${req.newChatsSocketPrefix}-${id}`, { chat });
        }
        res.sendStatus(201);
        // res.json(chat);
    } else {
        res.sendStatus(500);
    }
};


handlers.addContact = async (req, res) => {
    const contactId = req.params.id;
    const currentUser = req.user;
    if (currentUser.contactsIds.includes(contactId)) {
        res.sendStatus(200);
        return;
    }
    // неконсистентные правки в модели (1):
    const contact = await User.findByID(contactId);
    if (contact === null) {
        res.sendStatus(404);
        return;
    }
    currentUser.contactsIds.push(contact.id);
    contact.contactsIds.push(currentUser.id);
    const outcome = await awaitAllWithOutcome(
        currentUser.update({}),
        contact.update({})
    );
    if (outcome !== null) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
};


// TODO: refactor
handlers.addChat = async (req, res) => {
    const chatId = req.params.id;
    const currentUser = req.user;
    if (currentUser.chatsIds.includes(chatId)) {
        res.sendStatus(200);
        return;
    }
    // неконсистентные правки в модели (2):
    const chat = await dbConnection.getChat(chatId);
    if (chat === null) {
        res.sendStatus(404);
        return;
    }
    currentUser.chatsIds.push(chat.id);
    chat.usersIds.push(currentUser.id);
    const outcome = await awaitAllWithOutcome(
        currentUser.update({}),
        dbConnection.updateChat(chat)
    );
    if (outcome !== null) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
};


const _getEntityByUserId = getter => async (req, res) => {
    const currentUser = req.user;
    const chats = await getter(currentUser.id);
    res.json(chats);
};

handlers.getAllUserChats = _getEntityByUserId(id => dbConnection.getUserChats(id));

handlers.getAllUserContacts = _getEntityByUserId(id => dbConnection.getUserContacts(id));


module.exports = sock => {
    io = sock;
    return handlers;
};
