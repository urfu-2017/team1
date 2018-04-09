export const VISIBILITY_CHAT = 'VISIBILITY_CHAT';
export const RECEIVED_NEW_MESSAGE = 'RECEIVED_NEW_MESSAGE';
export const SEND_NEW_MESSAGE = 'SEND_NEW_MESSAGE';
export const SELECT_CHAT = 'SELECT_CHAT';
export const VISIBILITY_MENU = 'VISIBILITY_MENU';
export const MESSAGE_SAVED = 'MESSAGE_SAVED';

export const setVisibilityChat = chat => ({ type: VISIBILITY_CHAT, chat });

export const addMessageFromSocket = (message, currentUserId) =>
    ({ type: RECEIVED_NEW_MESSAGE, info: { message, currentUserId } });

export const addMessageFromChatInput = message => ({ type: SEND_NEW_MESSAGE, message });

export const selectChat = id => ({ type: SELECT_CHAT, id });

export const setVisibilityMenu = visibility => ({ type: VISIBILITY_MENU, visibility });

const saveStatus = (status, userMessage) =>
    ({ type: MESSAGE_SAVED, info: { status, userMessage } });

export const asyncSendMessage = message => dispatch => {
    /* const options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ message })
    };
    fetch(URL, options)
        .then(response => {
     вывести что сообщение не отправлено
     } */

    // todo: поменять урл на когда будет готово
    const URL = 'https://webdev-task-2-rmcovhtbdk.now.sh/places';
    fetch(URL)
        .then(response => {
            if (response.status === 200) {
                dispatch(saveStatus('(сохранено)', message));
            } else {
                dispatch(saveStatus('(не отправлено)', message));
            }
        });
};
