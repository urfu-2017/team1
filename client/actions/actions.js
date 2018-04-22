export const VISIBILITY_CHAT = 'VISIBILITY_CHAT';
export const RECEIVED_NEW_MESSAGE = 'RECEIVED_NEW_MESSAGE';
export const SEND_NEW_MESSAGE = 'SEND_NEW_MESSAGE';
export const SELECT_CHAT = 'SELECT_CHAT';
export const VISIBILITY_MENU = 'VISIBILITY_MENU';
export const VISIBILITY_CONTACTS = 'VISIBILITY_CONTACTS';
export const MESSAGE_SAVED = 'MESSAGE_SAVED';
export const RECEIVED_NEW_CHAT = 'RECEIVED_NEW_CHAT';
export const SEND_NEW_CHAT = 'SEND_NEW_CHAT';
export const CHAT_SAVED = 'CHAT_SAVED';
export const UPDATE_CHAT_LIST = 'UPDATE_CHAT_LIST';

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


export const addMessageFromChatInput = message => ({ type: SEND_NEW_MESSAGE, message });

export const selectChat = id => ({ type: SELECT_CHAT, id });

export const setVisibilityMenu = visibility => ({ type: VISIBILITY_MENU, visibility });

export const setVisibilityContacts = visibility => ({ type: VISIBILITY_CONTACTS, visibility });

export const updateChatList = chats => ({ type: UPDATE_CHAT_LIST, chats });

const saveStatus = (status, userMessage) =>
    ({ type: MESSAGE_SAVED, info: { status, userMessage } });

export const asyncSendMessage = (message, serverURL) => dispatch => {
    const URL = `api/rest/chats/${message.chatId}/messages`;
    const options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ message }),
        credentials: 'same-origin'
    };
    fetch(URL, options)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Ooops');
            }
        })
        .then(updatedMessage => {
            message.metadata = updatedMessage.metadata;
            dispatch(saveStatus('\t✓', message));
        })
        .catch(() => {
            dispatch(saveStatus('\t⨯', message));
        });
};

export const addNewChatFromSocket = (chat, currentUserId) =>
    ({ type: RECEIVED_NEW_CHAT, info: { chat, currentUserId } });

const saveChat = (status, userChat) =>
    ({ type: CHAT_SAVED, info: { status, userChat } });

export const asyncCreateChat = (sourceUserId, targetUserId, callback) => dispatch => {
    const URL = '/api/v1/chats/p2p';
    const body = JSON.stringify({ targetUserId });
    const options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body,
        credentials: 'same-origin'
    };
    fetch(URL, options)
        .then(response => response.json())
        .then(response => dispatch(callback(response)));
};

export const fetchChats = () => dispatch => {
    const URL = '/api/v1/chats';
    const options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        credentials: 'same-origin'
    };
    fetch(URL, options)
        .then(response => response.json())
        .then(response => dispatch(updateChatList(response)));
};

export const addChatFromContacts = chat => ({ type: SEND_NEW_CHAT, chat });
