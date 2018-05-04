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
    const { mutation, node } = subscriptionData.data.Message;
    variables.chatId = node.chat.id;
    switch (mutation) {
        case 'CREATED':
            return addNewMessage(node, previousResult);
        case 'UPDATED':
            return updateMessage(node, previousResult);
        case 'DELETED':
            return deleteMessage(node, previousResult);
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


export const chatSubscriptionDataHandler = (previousResult, { subscriptionData, variables }) => {
    if (!previousResult.Chat) {
        return previousResult;
    }
    return { Chat: subscriptionData.data.Chat.node };
};


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


export const getTitleForPersonalChat = (userId1, userId2) => {
    const length = Math.min(userId1.length, userId2.length);
    return [...Array(length).keys()]
        .map(i => String.fromCharCode(userId1.charCodeAt(i) ^ userId2.charCodeAt(i)))
        .join();
};
