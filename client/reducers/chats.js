import { UPDATE_CHAT_LIST, ADD_CHAT_TO_CHAT_LIST, UPDATE_CHAT } from '../actions/actions';

export default function chatsReducer(state = [], action) {
    switch (action.type) {
    case UPDATE_CHAT_LIST: {
        return action.chats;
    }
    case UPDATE_CHAT: {
        for (let chat of state) {
            if (chat._id === action.chat._id) {
                chat.avatar = action.chat.avatar;
                chat.name = action.chat.name;
            }
        }
        return Object.assign([], state);
    }
    case ADD_CHAT_TO_CHAT_LIST: {
        const { chat } = action;
        if (!state.find(c => c._id === chat._id)) {
            return state.concat(chat);
        }
        return state;
    }
    default: return state;
    }
}
