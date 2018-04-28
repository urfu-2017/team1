// декораторы только на классы?! Идиотизм...
export const addNewMessage = (message, target) => {
    let messages = [...target.Chat.messages];
    // Если такое сообщение уже есть (т.е. получили своё же)
    if (messages.find(msg => msg.id === message.id)) {
        return target;
    }
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
