import makeRequestOptions from '../utils/request';

export const VISIBILITY_CHAT = 'VISIBILITY_CHAT';
export const RECEIVED_NEW_MESSAGE = 'RECEIVED_NEW_MESSAGE';
export const SEND_NEW_MESSAGE = 'SEND_NEW_MESSAGE';
export const SELECT_CHAT = 'SELECT_CHAT';
export const MESSAGE_SAVED = 'MESSAGE_SAVED';
export const SEND_NEW_CHAT = 'SEND_NEW_CHAT';
export const MESSAGE_PICTURE_SAVED = 'MESSAGE_PICTURE_SAVED';

export const CHANGED_GROUP_CHAT_CREATOR_STATE = 'CHANGED_GROUP_CHAT_CREATOR_STATE';
export const CHANGED_GROUP_CHAT_EDITOR_STATE = 'CHANGED_GROUP_CHAT_EDITOR_STATE';

export const ADD_CHAT_TO_CHAT_LIST = 'ADD_CHAT_TO_CHAT_LIST';
export const UPDATE_CHAT = 'UPDATE_CHAT';
export const UPDATE_CHAT_LIST = 'UPDATE_CHAT_LIST';
export const UPDATE_CONTACT_LIST = 'UPDATE_CONTACT_LIST';
export const SAVED_AVATAR = 'SAVED_AVATAR';

export const CHANGE_PROFILE_EDITOR_STATE = 'CHANGE_PROFILE_EDITOR_STATE';

export const CHANGE_IMAGE_SENDER_STATE = 'CHANGE_IMAGE_SENDER_STATE';

export const VISIBILITY_PARANJA = 'VISIBILITY_PARANJA';

export const setVisibilityParanja = visibility => ({ type: VISIBILITY_PARANJA, visibility });

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

export const addChatToChatList = chat => ({ type: ADD_CHAT_TO_CHAT_LIST, chat });

export const updateChat = chat => ({ type: UPDATE_CHAT, chat });

export const updateChatList = chats => ({ type: UPDATE_CHAT_LIST, chats });

export const updateContacts = contacts => ({ type: UPDATE_CONTACT_LIST, contacts });

export const setAvatar = avatar => ({ type: SAVED_AVATAR, avatar });

export const setProfileEditorState = state => ({ type: CHANGE_PROFILE_EDITOR_STATE, state });

export const setGroupChatCreatorState = state => ({ type: CHANGED_GROUP_CHAT_CREATOR_STATE, state });
export const setGroupChatEditorState = chat => ({ type: CHANGED_GROUP_CHAT_EDITOR_STATE, chat });
export const setImageSenderState = state => ({ type: CHANGE_IMAGE_SENDER_STATE, state });

export const saveMessage = (chat, isSuccess, dumbMessage, message) =>
    ({ type: MESSAGE_SAVED, chat, isSuccess, dumbMessage, message });

export const savePictureMessage = (chat, isSuccess, message) =>
    ({ type: MESSAGE_PICTURE_SAVED, chat, isSuccess, message });

export const sendMessage = (chat, message) => dispatch => {
    fetch(`api/v1/chats/${chat._id}/send`, makeRequestOptions({ body: { message }, method: 'POST' }))
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

export const editChat = (chat, name, userIds) => dispatch => {
    fetch(`api/v1/chats/${chat._id}/edit`, makeRequestOptions({ method: 'POST', body: { name, userIds } }))
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Ooops');
            }
        })
        .then(updatedChat => {
            dispatch(updateChat(updatedChat));
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

export const createGroupChat = (name, userIds) => dispatch => {
    fetch('/api/v1/chats/group', makeRequestOptions({ method: 'POST', body: { userIds, name } }))
        .then(response => response.json())
        .then(response => {
            dispatch(addChatToChatList(response));
            dispatch(setVisibilityChat(response));
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

export const sendImage = (chat, imageData) => dispatch => {
    fetch('/api/v1/upload/picture', makeRequestOptions({ method: 'POST', body: { imageData, chatId: chat._id } }))
        .then(response => response.json())
        .then(message => {
            dispatch(setImageSenderState(false));
            if (message.picture) {
                dispatch(savePictureMessage(chat, true, message));
            }
        })
        .catch(() => alert('Слишком много запросов на сервере, подождите'));
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
