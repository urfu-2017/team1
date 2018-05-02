import { combineReducers } from 'redux';

import chatReducer from './chats';
import createCurrentInfo from './currentInfo';
import contactsReducer from './contacts';

export default function makeReducer(initialProps) {
    return combineReducers({
        chats: chatReducer,
        contacts: contactsReducer,
        currentInfo: createCurrentInfo(initialProps.user, initialProps.serverURL),
        socketURL: initialProps.socketURL
    });
}
