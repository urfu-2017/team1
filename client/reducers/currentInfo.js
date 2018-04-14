import { VISIBILITY_CHAT, SELECT_CHAT, VISIBILITY_MENU, VISIBILITY_CONTACTS, WEATHER_GET }
    from '../actions/actions';

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
    },
    weatherData: {}
};

export default function createMetaReducer(currentUser) {
    initialStateStub.currentUser = currentUser;
    const initialState = Object.assign({}, initialStateStub);
    return (state = initialState, action) => {
        switch (action.type) {
        case WEATHER_GET:
            state.weatherData = action.weatherData;
            return Object.assign({}, state);
        case VISIBILITY_CHAT:
            // console.log('chat');
            // console.log(action.chat);
            state.currentChat = action.chat;
            return Object.assign({}, state);
        case SELECT_CHAT:
            // console.log('chatId');
            // console.log(action.id);
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
