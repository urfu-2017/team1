export const VISIBILITY_CHAT = 'VISIBILITY_CHAT';
export const RECEIVED_NEW_MESSAGE = 'RECEIVED_NEW_MESSAGE';
export const SEND_NEW_MESSAGE = 'SEND_NEW_MESSAGE';

export const setVisibilityChat = chat => ({ type: VISIBILITY_CHAT, chat });

export const addMessage = message => ({ type: RECEIVED_NEW_MESSAGE, message });

export const sendNewMessage = message => ({ type: SEND_NEW_MESSAGE, message });
