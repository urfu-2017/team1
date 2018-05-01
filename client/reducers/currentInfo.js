import {
    VISIBILITY_CHAT,
    SELECT_CHAT,
    VISIBILITY_PARANJA,
    MESSAGE_SAVED,
    SEND_NEW_MESSAGE,
    SAVED_AVATAR,
    CHANGE_PROFILE_EDITOR_STATE,
    CHANGED_GROUP_CHAT_EDITOR_STATE
} from '../actions/actions';

const initialStateStub = {
    currentUser: {
        name: 'Current User',
        avatar: 'path-to-avatar.jpeg',
        id: 'USER_ID'
    },
    currentChat: {},
    isOpenParanja: false,
    profileEditorState: false,
    groupChatEditorState: false
};

export default function createMetaReducer(currentUser) {
    initialStateStub.currentUser = currentUser;
    const initialState = Object.assign({}, initialStateStub);
    return (state = initialState, action) => {
        switch (action.type) {
        case SAVED_AVATAR:
            state.currentUser.avatar = action.avatar;
            return Object.assign({}, state);
        case VISIBILITY_CHAT:
            state.currentChat = action.chat;
            state.groupChatEditorState = false;
            return Object.assign({}, state);
        case SEND_NEW_MESSAGE: {
            if (!action.chat.messages.find(m => m._id === action.message._id)) {
                action.chat.messages.push(action.message);
            }
            state.currentChat = Object.assign({}, action.chat);
            return Object.assign({}, state);
        }
        case CHANGE_PROFILE_EDITOR_STATE: {
            state.profileEditorState = action.state;
            return Object.assign({}, state);
        }
        case CHANGED_GROUP_CHAT_EDITOR_STATE: {
            state.groupChatEditorState = action.state;
            return Object.assign({}, state);
        }
        case MESSAGE_SAVED: {
            const { chat, dumbMessage, message } = action;
            for (const messageIndex in chat.messages) { // eslint-disable-line
                const m = chat.messages[messageIndex];
                if (m._id === dumbMessage._id) {
                    chat.messages[messageIndex] = message;
                }
            }
            state.currentChat = Object.assign({}, chat);
            return Object.assign({}, state);
        }
        case SELECT_CHAT:
            state.selectedChatId = action.id;
            return Object.assign({}, state);
        case VISIBILITY_PARANJA:
            state.isOpenParanja = action.visibility;
            return Object.assign({}, state);
        default: return state;
        }
    };
}
