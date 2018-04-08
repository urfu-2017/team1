import { VISIBILITY_CHAT, SEND_NEW_MESSAGE } from '../actions/actions';

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
    case SEND_NEW_MESSAGE: {
        let message = action.message;
        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ message })
        };
        //асинхронный запрос попытаться сохранить в базе
        //let res = await fetch(URL, options)
        //    .then(() => fetch(URL));
        //if (res.status !== 200) {
            //вывести что сообщение не отправлено
        //}
        
        return state;
    }

    default: return state;
    }
}
