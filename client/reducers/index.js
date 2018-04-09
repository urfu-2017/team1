import { combineReducers } from 'redux';

import chats from './chats';
import currentInfo from './currentInfo';
import initialReducer from './initial'

export default function makeReducer (initialProps) {
    return combineReducers({
        allChats: chats,
        currentInfo,
        initial: initialReducer(initialProps)
    });
}
