export const getChatName = (chat, user) => { // eslint-disable-line
    return chat.name || chat.contacts.filter(contact => contact.userId !== user._id)[0].name;
};
