import makeRequestOptions from '../utils/request';

export const VISIBILITY_CHAT = 'VISIBILITY_CHAT';
export const RECEIVED_NEW_MESSAGE = 'RECEIVED_NEW_MESSAGE';
export const SEND_NEW_MESSAGE = 'SEND_NEW_MESSAGE';
export const SELECT_CHAT = 'SELECT_CHAT';
export const MESSAGE_SAVED = 'MESSAGE_SAVED';
export const SEND_NEW_CHAT = 'SEND_NEW_CHAT';

export const ADD_CHAT_TO_CHAT_LIST = 'ADD_CHAT_TO_CHAT_LIST';
export const UPDATE_CHAT_LIST = 'UPDATE_CHAT_LIST';
export const UPDATE_CONTACT_LIST = 'UPDATE_CONTACT_LIST';
export const SAVED_AVATAR = 'SAVED_AVATAR';

export const CHANGE_PROFILE_EDITOR_STATE = 'CHANGE_PROFILE_EDITOR_STATE';

export const ADD_ALARM_CLOCK = 'ADD_ALARM_CLOCK';
export const VISIBILITY_PARANJA = 'VISIBILITY_PARANJA';

export const setVisibilityParanja = visibility => ({ type: VISIBILITY_PARANJA, visibility });

export const setVisibilityChat = chat => ({ type: VISIBILITY_CHAT, chat });

export const addAlarmClock = alarmClock => ({ type: ADD_ALARM_CLOCK, alarmClock });

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

export const addChatToChatList = chat => ({ type: ADD_CHAT_TO_CHAT_LIST, chat });

export const updateChatList = chats => ({ type: UPDATE_CHAT_LIST, chats });

export const updateContacts = contacts => ({ type: UPDATE_CONTACT_LIST, contacts });

export const setAvatar = avatar => ({ type: SAVED_AVATAR, avatar });

export const setProfileEditorState = state => ({ type: CHANGE_PROFILE_EDITOR_STATE, state }); 

export const saveMessage = (chat, isSuccess, dumbMessage, message) =>
    ({ type: MESSAGE_SAVED, chat, isSuccess, dumbMessage, message });

export const sendMessage = (chat, message) => dispatch => {
    fetch(`api/v1/chats/${chat._id}`, makeRequestOptions({ body: { message }, method: 'POST' }))
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
    fetch('/api/v1/chats/p2p', makeRequestOptions({ method: 'POST', body: { targetUserId } }))
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

export const changeAvatar = avatarData => dispatch => {
    fetch('/api/v1/upload/avatar', makeRequestOptions({ method: 'POST', body: { avatarData } }))
        .then(response => response.json())
        .then(response => {
            dispatch(setVisibilityParanja(false));
            dispatch(setProfileEditorState(false));
            dispatch(setAvatar(response.avatar));
        });
};

export const setReactionToMessage = (chat, messageId, reactionId) => dispatch => {
    fetch(`/api/v1/chats/${chat._id}/${messageId}/reaction`, makeRequestOptions({ method: 'POST', body: { reactionId } }))
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Ooops');
            }
        })
        .then(message => dispatch(saveMessage(chat, true, message, message)));
};
