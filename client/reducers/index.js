import { combineReducers } from 'redux';

import chatReducer from './chats';
import createCurrentInfo from './currentInfo';

export default function makeReducer(initialProps) {
    return combineReducers({
        chats: chatReducer,
        currentInfo: createCurrentInfo(initialProps.user),
        contacts: initialProps.contacts,
        socket: initialProps.socket
    });
}
