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
