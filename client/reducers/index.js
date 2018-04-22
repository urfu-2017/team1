import { combineReducers } from 'redux';

import createChatReducer from './chats';
import createMetaReducer from './meta';
import createCurrentInfo from './currentInfo';

export default function makeReducer(initialProps) {
    return combineReducers({
        allChats: createChatReducer(initialProps.chats),
        currentInfo: createCurrentInfo(initialProps.user),
        meta: createMetaReducer({
            serverURL: initialProps.serverURL,
            chatSocketPrefix: initialProps.chatSocketPrefix,
            newChatsSocketPrefix: initialProps.newChatsSocketPrefix
        }),
        contacts: initialProps.contacts
    });
}
