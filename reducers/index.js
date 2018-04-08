import { ADD_MESSAGE, VISIBILITY_CHAT, SELECT_CHAT, VISIBILITY_MENU } from '../actions/actions';


const initialState = {
    currentUser: {
        name: 'Current User',
        avatar: 'path-to-avatar.jpeg',
        id: 'ALPHANUMERIC_ID'
    },
    selectedChatId: null,
    openMenu: false,
    allChats: [
        {
            title: 'First Chat Title',
            picture: 'path-to-chat-pic.jpeg',
            id: 'ALPHANUMEfRIC_ID',
            lastMessage: {
                content: {
                    text: 'message text message text message text',
                    attachments: [],
                    pictures: []
                },
                sender: {
                    name: 'user1',
                    avatar: 'path-to-avatar.jpeg',
                    id: 'ALPHANUMERIC_ID'
                }
            },
            messages: [
                {
                    content: {
                        text: 'message text',
                        attachments: [],
                        pictures: []
                    },
                    sender: {
                        name: 'user1',
                        avatar: 'path-to-avatar.jpeg',
                        id: 'ALPHANUMERIC_ID'
                    }
                },
                {
                    content: {
                        text: 'message text',
                        attachments: [],
                        pictures: []
                    },
                    sender: {
                        name: 'user2',
                        avatar: 'path-to-avatar.jpeg',
                        id: 'ALPHANUMERIC_ID'
                    }
                },
                {
                    content: {
                        text: 'message text',
                        attachments: [],
                        pictures: []
                    },
                    sender: {
                        name: 'user1',
                        avatar: 'path-to-avatar.jpeg',
                        id: 'ALPHANUMERIC_ID'
                    }
                }
            ]
        },
        {
            title: 'Second Chat Title',
            picture: 'path-to-chat-pic.jpeg',
            id: 'ALPHANUMERIC_ID',
            lastMessage: {
                content: {
                    text: 'message text',
                    attachments: [],
                    pictures: []
                },
                sender: {
                    name: 'user2',
                    avatar: 'path-to-avatar.jpeg',
                    id: 'ALPHANUMERIC_ID'
                }
            },
            messages: [
                {
                    content: {
                        text: 'message',
                        attachments: [],
                        pictures: []
                    },
                    sender: {
                        name: 'user1',
                        avatar: 'path-to-avatar.jpeg',
                        id: 'ALPHANUMERIC_ID'
                    }
                }
            ]
        }
    ],
    currentChat: {},
    sessionInfoAndSecurityTokens: {
        HereBeDragons: '¯\\_(ツ)_/¯'
    }
};

const makeReducer = initialProps => {
    const initial = Object.assign({}, initialState, initialProps);
    return (state = initial, action) => {
        switch (action.type) {
        case VISIBILITY_CHAT:
            state.currentChat = action.chat;
            return Object.assign({}, state);
        case ADD_MESSAGE:
            state.currentChat.messages = [...state.currentChat.messages, action.message];
            return Object.assign({}, state);
        case SELECT_CHAT:
            state.selectedChatId = action.id;
            return Object.assign({}, state);
        case VISIBILITY_MENU:
            state.openMenu = action.visibility;
            return Object.assign({}, state);
        default: return state;
        }
    };
};

export default makeReducer;
