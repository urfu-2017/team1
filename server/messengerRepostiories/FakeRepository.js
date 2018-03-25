'use strict';


const idToMessage = {};
const idToUser = {};
const idToChat = {};


class FakeRepository {
    static saveMessage(message) {
        idToMessage[message.id] = message;
    }

    static saveUser(user) {
        idToUser[user.id] = user;
    }

    static saveChat(chat) {
        idToChat[chat.id] = chat;
    }

    static getUser(userId) {
        return idToUser[userId];
    }

    static getAllMessages(chatId) {
        const lastMessageId = idToChat[chatId].head;
        let message = idToMessage[lastMessageId];
        const messages = [message];
        while (message.previousMessageId) {
            message = message.previousMessageId;
            messages.push(message);
        }

        return messages;
    }

    static getMessagesByRange(chatId, oldestMessageId, countMessages) {
        const messages = FakeRepository.getAllMessages(chatId);
        const oldestMessage = idToMessage[oldestMessageId];
        const firstNotIncludedIndex = messages.findIndex(message => (
            message.createAt <= oldestMessage.createAt
        ));

        return messages.slice(0, Math.min(firstNotIncludedIndex, countMessages));
    }

    static getAllChats(userId) {
        return idToUser[userId].chatsId.map(chatId => idToChat[chatId]);
    }

    static getChatsByRange(userId, oldestChatId, countChats) {
        const chats = FakeRepository.getAllChats(userId);
        chats.sort(sortDescChatsByDateLastMessage);
        let lastIncludedIndex = chats.findIndex(chat => chat.id === oldestChatId);
        if (lastIncludedIndex === -1) {
            lastIncludedIndex = Number.POSITIVE_INFINITY;
        }

        return chats.slice(0, Math.min(lastIncludedIndex + 1, countChats));
    }
}

function sortDescChatsByDateLastMessage(first, second) {
    if (!first.tail || !second.tail) {
        return 1;
    }
    const message1 = idToMessage[first.tail];
    const message2 = idToMessage[second.tail];
    if (message1.createAt < message2.createAt) {
        return -1;
    }
    if (message1.createAt === message2.createAt) {
        return 0;
    }

    return 1;
}

module.exports = FakeRepository;
