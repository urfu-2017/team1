'use strict';

/* eslint class-methods-use-this: "error" */
class IMessengerRepositrory {
    saveMessage(message) {

    }

    saveUser(user) {

    }

    saveChat(chat) {

    }

    getUser(userId) {

    }

    getChat(chatId) {
        
    }

    getAllMessages(chatId) {

    }

    getUserIdByGithubId(githubId) {

    }

    getMessagesByRange(chatId, oldestMessageId, countMessages) {
        /* oldestMessageId назввание так себе,
        смысл что нажно вернуть count сообщений
         у которых дата создания больше даты startMessage*/
    }


    // все аналогично с чатами, кроме выдачи по диапозону, потому что сообщения добавляются снизу, а чаты сверху
    // только тут не самое старое сообщние, а самый старый чат, который давно не обновлялся

    getAllChats(userId) {

    }

    getChatsByRange(userId, oldestChatId, countChats) {

    }

    // todo: последние 4 метода можно обобщить по 2, нужно выделить сущьность обобщения, но видимо потом
}

module.exports = IMessengerRepositrory;
