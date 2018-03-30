'use strict';


const idToMessage = {};
const idToUser = {};
const idToChat = {};
const githubIdToUser = {};


class FakeRepository {
    // save

    static saveMessage(message) {
        idToMessage[message.id] = message;
    }

    static saveUser(user) {
        idToUser[user.id] = user;
        githubIdToUser[user.githubId] = user;
    }

    static saveChat(chat) {
        idToChat[chat.id] = chat;
    }

    // get

    static getChat(chatId) {
        return idToChat[chatId];
    }

    static getUser(userId) {
        return idToUser[userId];
    }

    static getUserIdByGithubId(githubId) {
        return githubIdToUser[githubId].id;
    }

    static getMessage(messageId) {
        return idToMessage[messageId];
    }

    // messages

    static getLastMessage(chatId) {
        const messageId = FakeRepository.getChat(chatId).lastMessageId;

        return FakeRepository.getMessage(messageId);
    }

    static getMessagesOlder(
        chatId,
        {
            lastMessage = FakeRepository.getLastMessage(chatId),
            messagesCount = Number.POSITIVE_INFINITY
        }
    ) {
        /* eslint-disable no-param-reassign */
        if (!lastMessage) {
            return [];
        }
        const messages = [];
        while (lastMessage.previousMessageId && messagesCount) {
            lastMessage = FakeRepository.getMessage(lastMessage.previousMessageId);
            messages.push(lastMessage);
            messagesCount--;
        }

        return messages;
    }

    static getUnreadMessages(chatId, userId) {
        const chat = FakeRepository.getChat(chatId);
        const lastReadIdMessage = chat.usersIdToIdLastReadMessage[userId];
        const messages = [];
        let message = FakeRepository.getLastMessage(chatId);
        while (message && message.id !== lastReadIdMessage) {
            messages.push(message);
            message = FakeRepository.getMessage(messages.previousMessageId);
        }

        return messages;
    }

    // chats

    static getChatsOlder(
        userId,
        {
            lastChat,
            chatsCounts = Number.POSITIVE_INFINITY
        }
    ) {
        const allChats = getNoEmptyChats(userId);
        allChats.sort((a, b) => sortChatsByDateLastMessage(a, b, 'desc'));
        if (!lastChat) {
            return allChats.slice(0, chatsCounts);
        }
        const startIndex = allChats.indexOf(lastChat);
        if (startIndex === -1) {
            return [];
        }
        return allChats.slice(startIndex + 1, chatsCounts);
    }
}


function sortChatsByDateLastMessage(first, second, order) {
    let numberForLeft;
    /* eslint-disable indent */
    switch (order) {
        case 'asc':
            numberForLeft = 1;
            break;
        case 'desc':
            numberForLeft = -1;
            break;
        default:
            throw new Error('Ф-ия sortChatsByDateLastMessageDesc в качестве order принимает только 2 возможных' +
                'значения:\n1)asc\n2)desc');
    }
    const message1 = FakeRepository.getMessage(first.lastMessageId);
    const message2 = FakeRepository.getMessage(second.lastMessageId);
    if (message1.createAt > message2.createAt) {
        return numberForLeft;
    }
    if (message1.createAt === message2.createAt) {
        return 0;
    }

    return -numberForLeft;
}

function getNoEmptyChats(userId) {
    const chats = FakeRepository.getUser(userId).chatsId
        .map(chatId => FakeRepository.getChat(chatId));

    return chats.map(chat => chat.firstMessageId);
}


module.exports = FakeRepository;
