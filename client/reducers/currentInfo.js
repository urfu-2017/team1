import { ADD_MESSAGE, VISIBILITY_CHAT } from '../actions/actions';

const initialState = {
    currentUser: {
        name: 'Current User',
        avatar: 'path-to-avatar.jpeg',
        id: 'ALPHANUMERIC_ID'
    },
    currentChat: {},
    sessionInfoAndSecurityTokens: {
        HereBeDragons: '¯\\_(ツ)_/¯'
    }
};

export default function currentInfo(state = initialState, action) {
    switch (action.type) {
    case VISIBILITY_CHAT:
        state.currentChat = action.chat;
        return Object.assign({}, state);
    case ADD_MESSAGE:
        state.currentChat.messages = [...state.currentChat.messages, action.message];
        return Object.assign({}, state);
    default: return state;
    }
}