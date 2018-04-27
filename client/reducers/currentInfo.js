import { VISIBILITY_CHAT, SELECT_CHAT, VISIBILITY_PARANJA, MESSAGE_SAVED, SEND_NEW_MESSAGE } from '../actions/actions';

const initialStateStub = {
    currentUser: {
        name: 'Current User',
        avatar: 'path-to-avatar.jpeg',
        id: 'USER_ID'
    },
    currentChat: {},
    isOpenParanja: false,
    sessionInfoAndSecurityTokens: {
        HereBeDragons: '¯\\_(ツ)_/¯'
    }
};

export default function createMetaReducer(currentUser) {
    initialStateStub.currentUser = currentUser;
    const initialState = Object.assign({}, initialStateStub);
    return (state = initialState, action) => {
        switch (action.type) {
        case VISIBILITY_CHAT:
            state.currentChat = action.chat;
            return Object.assign({}, state);
        case SEND_NEW_MESSAGE: {
            action.chat.messages.push(action.message);
            state.currentChat = Object.assign({}, action.chat);
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
