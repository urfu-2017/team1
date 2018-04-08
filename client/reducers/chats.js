import { RECEIVED_NEW_MESSAGE } from '../actions/actions';

const initialState = [
    {
        title: 'First Chat Title',
        picture: 'path-to-chat-pic.jpeg',
        id: 'ID_1',
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
        id: 'ID_2',
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
];

export default function chats(state = initialState, action) {
    switch (action.type) {
    case RECEIVED_NEW_MESSAGE: {
        const neededChat = state.find(x => x.id === action.message.chatId);
        neededChat.messages = [...neededChat.messages, action.message];
        return Object.assign([], state);
    }
    default: return state;
    }
}

