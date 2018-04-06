import { ADD_MESSAGE, VISIBILITY_CHAT } from '../actions/actions';


const initialState = {
    currentUser: {
        name: 'Current User',
        avatar: 'path-to-avatar.jpeg',
        id: 'ALPHANUMERIC_ID'
    },
    allChats: [
        {
            title: 'First Chat Title',
            picture: 'path-to-chat-pic.jpeg',
            id: 'ALPHANUMEfRIC_ID',
            lastMessage: {
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

export default function sidebar(state = initialState, action) {
    switch (action.type) {
    case VISIBILITY_CHAT:
        state.currentChat = action.chat;
        return Object.assign({}, state);
    case ADD_MESSAGE:
        state.currentChat.messages = [...state.currentChat.messages, action.message];
        return Object.assign({}, state);
    default: return state;
    }
}

