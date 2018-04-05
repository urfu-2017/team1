export const VISIBILITY_CHAT = 'VISIBILITY_CHAT';
export const ADD_MESSAGE = 'ADD_MESSAGE';

export const setVisibilityChat = chat => ({ type: VISIBILITY_CHAT, chat });

export const addMessage = message => ({ type: ADD_MESSAGE, message });
