import { UPDATE_CHAT_LIST } from '../actions/actions';

export default function chatsReducer(state = [], action) {
    switch (action.type) {
    case UPDATE_CHAT_LIST: {
        return action.chats;
    }
    default: return state;
    }
}
