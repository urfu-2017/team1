import { combineReducers } from 'redux';

import chats from './chats';
import currentInfo from './currentInfo';
import initialReducer from './initial';
import createMetaReducer from './meta';

export default function makeReducer(initialProps) {
    return combineReducers({
        allChats: chats,
        currentInfo,
        initial: initialReducer(initialProps),
        meta: createMetaReducer({
            serverURL: initialProps.serverURL,
            chatSocketPrefix: initialProps.chatSocketPrefix
        })
    });
}
