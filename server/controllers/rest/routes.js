'use strict';

const express = require('express');
const getHandlers = require('./handlers');


const getRouter = io => {
    const handlers = getHandlers(io);
    const router = express.Router();
    router.get('/users/all', handlers.getAllUsers); // sort(date|alph), limit, offset, etc.
    router.get('/users/:id', handlers.getUser);

    router.get('/chats/all', handlers.getAllChats); // sort(date|alph), limit, offset, etc.
    router.get('/chats/:id', handlers.getChat);
    router.get('/chats/:id/messages', handlers.getChatMessages);
    router.get('/chats/:id/everything', handlers.getAllChatInfo);

    // добавляет сообщение в чат `id` (сейчас находится в /message)
    // в body.message ожидает объект { content: { text, ... } }
    router.post('/chats/:id/messages', handlers.createMessage);

    // создаёт новый чат, добавляет авторизованного пользователя в этот чат
    // в body.chat ожидает объект { title, picture }
    router.post('/chats', handlers.createChat); // возвращает объект этого чата

    // создаёт новый чат с авторизованным пользователем и пользователем `id`
    // возвращает объект чата
    router.post('/users/:id/start-chat', handlers.startChatWithUser);

    router.get('/current-user/contacts/all', handlers.getAllUserContacts);
    router.route('/current-user/contacts/:id')
        .put(handlers.addContact); // добавляет пользователя `id` в список контактов авторизованного пользователя
    //    .delete(deleteContact); // TODO на следующей итерации

    router.get('/current-user/chats/all', handlers.getAllUserChats);
    router.route('/current-user/chats/:id')
        .put(handlers.addChat); // добавляет чат `id` в список чатов авторизованного пользователя
    //    .delete(deleteChat); // TODO на следующей итерации

    router.get('/open-the-pod-bay-door-hal', handlers.invalidateCache);

    // во всех случаях, если пользователь не имеет доступа к чату, возвращается 401
    // для упрощения работы со стороны клиента, все тела запросов (кроме createMessage, createChat) пустые
    // всё равно потом переходить на graphql

    return router;
};


module.exports = getRouter;
