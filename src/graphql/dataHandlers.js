import {GetLocalState} from '../graphql/localState';
import { notificateAboutNewMessage } from "../lib/notification";

// декораторы только на классы?! Идиотизм...
export const addNewMessage = (message, target) => {
    let messages = [...target.Chat.messages];
    // Если такое сообщение уже есть (т.е. получили своё же)
    if (messages.find(msg => msg.id === message.id)) {
        return target;
    }
    // результат optimistic response:
    const optimisticResponse = messages.find(
        msg => msg.id < 0 && msg.clientSideId === message.clientSideId);
    if (optimisticResponse) {
        message.pictures = optimisticResponse.pictures;
    }
    messages = messages.filter(msg => !(msg.id < 0));
    messages.push(message);
    return { Chat: { ...target.Chat, messages } };
};


export const updateMessage = (message, target) => {
    let messages = [...target.Chat.messages];
    const index = messages.find(msg => msg.id === message.id);
    if (index !== undefined) {
        messages[index] = message;
    }
    return { Chat: { ...target.Chat, messages } };
};


export const deleteMessage = (message, target) => {
    let messages = [...target.Chat.messages]
        .filter(msg => msg.id !== message.id);
    return { Chat: { ...target.Chat, messages } };
};


export const messagesSubscriptionDataHandler = (previousResult, { subscriptionData, variables }) => {
    if (!previousResult.Chat) {
        return previousResult;
    }

    const { mutation, node, previousValues } = subscriptionData.data.Message;
    if (node) {
        variables.chatId = node.chat.id;
    }
    switch (mutation) {
        case 'CREATED':
            return addNewMessage(node, previousResult);
        case 'UPDATED':
            return updateMessage(node, previousResult);
        case 'DELETED':
            return deleteMessage(previousValues, previousResult);
        default:
            return previousResult;
    }
};


export const userSubscriptionDataHandler = (previousResult, { subscriptionData, variables }) => {
    if (!previousResult.User) {
        return previousResult;
    }
    return { User: subscriptionData.data.User.node };
};


export const chatSubscriptionDataHandler = (client) => (previousResult, { subscriptionData, variables }) => {
    const { Chat } = subscriptionData.data;
    if (Chat.updatedFields && Chat.updatedFields.find(f => f === 'lastMessageReceivedAt')) {
        const chat = Chat.node;
        const { localState: { currentChatId } } = client.cache.readQuery({ query: GetLocalState.query });
        if (currentChatId.length === 0) {
            notificateAboutNewMessage();
        } else if (currentChatId !== chat.id) {
            notificateAboutNewMessage();
        }
    }
    if (!previousResult.Chat) {
        return previousResult;
    }
    return { Chat: subscriptionData.data.Chat.node };
};


// преобразует объект чата к пригодному для отображения виду
export const processChat = (currentUserId, chat) => {
    if (chat.groupchat) {
        return chat;
    }
    const otherUser = chat.members
        .find(u => u.id !== currentUserId);
    return {
        ...chat,
        title: otherUser.name,
        picture: otherUser.avatarUrl
    };
};
