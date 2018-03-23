'use strict';


const fakeUser1 = {
    name: 'first',
    chatsId: [1],
    id: 1
};
const fakeUser2 = {
    name: 'second',
    chatsId: [1],
    id: 2
};
const fakeChat = {
    name: 'rootChat',
    id: 1,
    usersId: [1, 2],
    messages: ['очень старое сообщение 1', 'очень старое сообщение 2', 'новое 1', 'новое 2', 'новое 3']
};


const idToUser = {
    1: fakeUser1,
    2: fakeUser2
};


class FakeRepository {

    // save методы для одного чата не нужны

    static saveMessage(message) {
        // pass
    }

    static saveUser(user) {
        // pass
    }

    static saveChat(chat) {
        // pass
    }

    static getUser(userId) {
        return idToUser[userId];
    }

    static getAllMessages(chatId) {
        return fakeChat.messages;
    }

    static getMessagesByRange(chatId, oldestMessageId, countMessages) {
        /* oldestMessageId назввание так себе,
        смысл что нажно вернуть count сообщений
         у которых дата создания больше даты startMessage */
        const oldMessageIndex = fakeChat.messages.find(message => message.contain('очень старое сообщение'));

        return fakeChat.messages.slice(oldMessageIndex, oldMessageIndex + countMessages);
    }


    // все аналогично с чатами, кроме выдачи по диапозону, потому что сообщения добавляются снизу, а чаты сверху
    // только тут не самое старое сообщние, а самый старый чат, который давно не обновлялся

    static getAllChats(userId) {
        return fakeChat;
    }

    static getChatsByRange(userId, oldestChatId, countChats) {
        return [fakeChat];
    }

    // todo: последние 4 метода можно обобщить по 2, нужно выделить сущьность обобщения, но видимо потом
}
