import { combineReducers } from 'redux';

import chats from './chats';
import createMetaReducer from './meta';
import createCurrentInfo from './currentInfo';

export default function makeReducer(initialProps) {
    return combineReducers({
        allChats: chats,
        currentInfo: createCurrentInfo(initialProps.user),
        meta: createMetaReducer({
            serverURL: initialProps.serverURL,
            chatSocketPrefix: initialProps.chatSocketPrefix
        })
    });
}