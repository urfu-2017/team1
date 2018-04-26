import makeRequestOptions from '../utils/request';

export const VISIBILITY_CHAT = 'VISIBILITY_CHAT';
export const RECEIVED_NEW_MESSAGE = 'RECEIVED_NEW_MESSAGE';
export const SEND_NEW_MESSAGE = 'SEND_NEW_MESSAGE';
export const SELECT_CHAT = 'SELECT_CHAT';
export const VISIBILITY_MENU = 'VISIBILITY_MENU';
export const VISIBILITY_CONTACTS = 'VISIBILITY_CONTACTS';
export const MESSAGE_SAVED = 'MESSAGE_SAVED';
export const SEND_NEW_CHAT = 'SEND_NEW_CHAT';
export const ADD_CHAT_TO_CHAT_LIST = 'ADD_CHAT_TO_CHAT_LIST';
export const UPDATE_CHAT_LIST = 'UPDATE_CHAT_LIST';
export const UPDATE_CONTACT_LIST = 'UPDATE_CONTACT_LIST';

export const setVisibilityChat = chat => ({ type: VISIBILITY_CHAT, chat });

export const addMessageFromSocket = (message, currentUserId, sender) =>
    ({ type: RECEIVED_NEW_MESSAGE, info: { message, currentUserId, sender } });


export const cursorIsPressedFromBelow = () => {
    const messages = document.querySelector('#messages');
    return Math.ceil(messages.scrollTop) + messages.offsetHeight >= messages.scrollHeight;
};

export const moveCursorDown = () => {
    const messages = document.querySelector('#messages');
    setTimeout(() => {
        messages.scrollTop = messages.scrollHeight - messages.offsetHeight;
    }, 0);
};

export const addMessageFromChatInput = (chat, message) => ({ type: SEND_NEW_MESSAGE, chat, message });

export const selectChat = id => ({ type: SELECT_CHAT, id });

export const setVisibilityMenu = visibility => ({ type: VISIBILITY_MENU, visibility });

export const setVisibilityContacts = visibility => ({ type: VISIBILITY_CONTACTS, visibility });

export const addChatToChatList = chat => ({ type: ADD_CHAT_TO_CHAT_LIST, chat });

export const updateChatList = chats => ({ type: UPDATE_CHAT_LIST, chats });

export const updateContacts = contacts => ({ type: UPDATE_CONTACT_LIST, contacts });

export const saveMessage = (chat, isSuccess, dumbMessage, message) =>
    ({ type: MESSAGE_SAVED, chat, isSuccess, dumbMessage, message });

export const sendMessage = (chat, message) => dispatch => {
    const URL = `api/v1/chats/${chat._id}`;
    const body = JSON.stringify({ message });
    fetch(URL, makeRequestOptions({ body, method: 'POST' }))
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Ooops');
            }
        })
        .then(updatedMessage => {
            dispatch(saveMessage(chat, true, message, updatedMessage));
        })
        .catch(() => {
            dispatch(saveMessage(chat, false, message));
        });
};

export const asyncCreateChat = (sourceUserId, targetUserId, callback) => dispatch => {
    const body = JSON.stringify({ targetUserId });
    fetch('/api/v1/chats/p2p', makeRequestOptions({ method: 'POST', body }))
        .then(response => response.json())
        .then(response => {
            dispatch(addChatToChatList(response));
            dispatch(callback(response));
        });
};

export const fetchChats = () => dispatch => {
    fetch('/api/v1/chats', makeRequestOptions({ method: 'GET' }))
        .then(response => response.json())
        .then(response => dispatch(updateChatList(response)));
};

export const fetchContacts = () => dispatch => {
    fetch('/api/v1/contacts', makeRequestOptions({ method: 'GET' }))
        .then(response => response.json())
        .then(response => dispatch(updateContacts(response.contacts)));
};

export const addChatFromContacts = chat => ({ type: SEND_NEW_CHAT, chat });
