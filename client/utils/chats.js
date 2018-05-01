export const getChatName = (chat, user) => {
    // chat.type == null - обратная совместимость
    if (chat.type === 'p2p' || chat.type == null) {
        return chat.name || chat.contacts.filter(contact => contact.userId !== user._id)[0].name;
    } else {
        return chat.name || chat.contacts.map(contact => contact.name).join(', ');
    }
};

export const getChatAvatar = (chat, user) => {
    return chat.avatar || chat.contacts.filter(contact => contact.userId !== user._id)[0].avatar;
};
