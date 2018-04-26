export const getChatName = (chat, user) => {
    return chat.name || chat.contacts.filter(contact => contact.userId !== user._id)[0].name;
};

export const getChatAvatar = (chat, user) => {
    return chat.avatar || chat.contacts.filter(contact => contact.userId !== user._id)[0].avatar;
};
