
import { combineReducers } from 'redux';

import chats from './chats';
import currentInfo from './currentInfo';

export default combineReducers({
    allChats: chats,
    currentInfo
});

