import { UPDATE_CHAT_LIST, ADD_CHAT_TO_CHAT_LIST } from '../actions/actions';

export default function chatsReducer(state = [], action) {
    switch (action.type) {
    case UPDATE_CHAT_LIST: {
        return action.chats;
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
