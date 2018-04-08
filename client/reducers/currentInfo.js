import { VISIBILITY_CHAT, SEND_NEW_MESSAGE, SELECT_CHAT, VISIBILITY_MENU } from '../actions/actions';

const initialState = {
    currentUser: {
        name: 'Current User',
        avatar: 'path-to-avatar.jpeg',
        id: 'ALPHANUMERIC_ID'
    },
    openMenu: false,
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
    case SEND_NEW_MESSAGE: {
        const message = action.message;
        const options = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ message })
        };
        // асинхронный запрос попытаться сохранить в базе
        // let res = await fetch(URL, options)
        //    .then(() => fetch(URL));
        // if (res.status !== 200) {
            // вывести что сообщение не отправлено
        // }
        return state;
    }
    case SELECT_CHAT:
        state.selectedChatId = action.id;
        return Object.assign({}, state);
    case VISIBILITY_MENU:
        state.openMenu = action.visibility;
        return Object.assign({}, state);
    default: return state;
    }
}
