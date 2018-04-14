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
export const WEATHER_GET = 'WEATHER_GET';

export const saveWeatherData = weatherData => {
    console.log('saveWeatherData');
    console.log(weatherData);

    return { type: WEATHER_GET, weatherData };
};

export const setVisibilityChat = chat => ({ type: VISIBILITY_CHAT, chat });

export const addMessageFromSocket = (message, currentUserId, sender) =>
    ({ type: RECEIVED_NEW_MESSAGE, info: { message, currentUserId, sender } });


export const cursorIsPressedFromBelow = () => {
    const messages = document.querySelector('#messages');
    return Math.ceil(messages.scrollTop) + messages.offsetHeight === messages.scrollHeight;
};

export const moveCursorDown = () => {
    const messages = document.querySelector('#messages');
    setTimeout(() => {
        messages.scrollTop = messages.scrollHeight - messages.offsetHeight;
    }, 500);
};


export const addMessageFromChatInput = message => ({ type: SEND_NEW_MESSAGE, message });

export const selectChat = id => ({ type: SELECT_CHAT, id });

export const setVisibilityMenu = visibility => ({ type: VISIBILITY_MENU, visibility });

export const setVisibilityContacts = visibility => ({ type: VISIBILITY_CONTACTS, visibility });


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
<<<<<<< HEAD
            // console.log(response);
=======
>>>>>>> 78555161b5fd04efaae26a7eb738531e903f51ef
            if (response.status === 201) {
                dispatch(saveStatus('\t✓', message));
            } else {
                dispatch(saveStatus('\t⨯', message));
            }
        });
};

export const addNewChatFromSocket = (chat, currentUserId) =>
    ({ type: RECEIVED_NEW_CHAT, info: { chat, currentUserId } });

const saveChat = (status, userChat) =>
    ({ type: CHAT_SAVED, info: { status, userChat } });

export const asyncCreateChat = (chat, contactId, callback) => dispatch => {
    const URL = `api/rest/users/${contactId}/start-chat`;
    const options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ chat }),
        credentials: 'same-origin'
    };
    fetch(URL, options)
<<<<<<< HEAD
        .then(response => {
            // console.log(response);
            if (response.status === 201) {
                dispatch(saveChat('\t✓', chat));
            } else {
                dispatch(saveChat('\t⨯', chat));
            }
        });
=======
        .then(response => response.json())
        .then(response => console.log('|||||||||') || console.log(response) || dispatch(callback(response)));
>>>>>>> 78555161b5fd04efaae26a7eb738531e903f51ef
};

export const addChatFromContacts = chat => ({ type: SEND_NEW_CHAT, chat });
