'use strict';

/* eslint class-methods-use-this: "error" */
class IMessengerRepository {
    static saveMessage(message) {

    }

    static saveUser(user) {

    }

    static saveChat(chat) {

    }

    static getUser(userId) {

    }

    getChat(chatId) {

    }

    getAllMessages(chatId) {

    }

    getUserIdByGithubId(githubId) {

    }

    static getMessagesByRange(chatId, oldestMessageId, countMessages) {
        /* oldestMessageId назввание так себе,
        смысл что нажно вернуть count сообщений
         у которых дата создания больше даты startMessage */
    }


    // все аналогично с чатами, кроме выдачи по диапозону, потому что сообщения добавляются снизу, а чаты сверху
    // только тут не самое старое сообщние, а самый старый чат, который давно не обновлялся

    static getAllChats(userId) {

    }

    static getChatsByRange(userId, oldestChatId, countChats) {

    }

    // todo: последние 4 метода можно обобщить по 2, нужно выделить сущьность обобщения, но видимо потом
}

module.exports = IMessengerRepository;
