import {
    SELECT_CHAT,
    ADD_USER_CHAT,
    VISIBILITY_CHAT,
    VISIBILITY_PARANJA,
    VISIBILITY_CHAT_EDITOR
} from '../actions/actions';

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
        case VISIBILITY_CHAT_EDITOR:
            state.isOpenChatEditor = action.visibility;
            return Object.assign({}, state);
        case VISIBILITY_CHAT:
            state.currentChat = action.chat;
            return Object.assign({}, state);
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
