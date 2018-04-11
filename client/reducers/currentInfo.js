import { VISIBILITY_CHAT, SELECT_CHAT, VISIBILITY_MENU } from '../actions/actions';

let initialStateStub = {
    currentUser: {
        name: 'Current User',
        avatar: 'path-to-avatar.jpeg',
        id: 'USER_ID'
    },
    openMenu: false,
    currentChat: {},
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
            case SELECT_CHAT:
                state.selectedChatId = action.id;
                return Object.assign({}, state);
            case VISIBILITY_MENU:
                state.openMenu = action.visibility;
                return Object.assign({}, state);
            default: return state;
            }
    };
}
