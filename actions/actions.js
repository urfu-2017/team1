export const VISIBILITY_CHAT = 'VISIBILITY_CHAT';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SELECT_CHAT = 'SELECT_CHAT';
export const VISIBILITY_MENU = 'VISIBILITY_MENU';

export const setVisibilityChat = chat => ({ type: VISIBILITY_CHAT, chat });

export const addMessage = message => ({ type: ADD_MESSAGE, message });

export const selectChat = id => ({ type: SELECT_CHAT, id });

export const setVisibilityMenu = visibility => ({ type: VISIBILITY_MENU, visibility });
