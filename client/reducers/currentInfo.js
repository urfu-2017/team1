import { VISIBILITY_CHAT, SELECT_CHAT, VISIBILITY_MENU, VISIBILITY_CONTACTS, 
    MESSAGE_SAVED, SEND_NEW_MESSAGE } from '../actions/actions';

const initialStateStub = {
    currentUser: {
        name: 'Current User',
        avatar: 'path-to-avatar.jpeg',
        id: 'USER_ID'
    },
    currentChat: {},
    openMenu: false,
    openContacts: false,
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
            const { chat, isSuccess, dumbMessage, message } = action;
            for (const messageIndex in chat.messages) {
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
        case VISIBILITY_MENU:
            state.openMenu = action.visibility;
            return Object.assign({}, state);
        case VISIBILITY_CONTACTS:
            state.openContacts = action.visibility;
            return Object.assign({}, state);
        default: return state;
        }
    };
}
