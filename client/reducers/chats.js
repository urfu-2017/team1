import {
    RECEIVED_NEW_MESSAGE,
    RECEIVED_NEW_CHAT,
    SEND_NEW_MESSAGE,
    MESSAGE_SAVED,
    SEND_NEW_CHAT,
    CHAT_SAVED
} from '../actions/actions';

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
            // todo fix this to senderId
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
                senderId: 'ALPHANUMERIC_ID'
            },
            {
                content: {
                    text: 'message text',
                    attachments: [],
                    pictures: []
                },
                senderId: 'ALPHANUMERIC_ID'
            },
            {
                content: {
                    text: 'message text',
                    attachments: [],
                    pictures: []
                },
                senderId: 'ALPHANUMERIC_ID'
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
                name: 'user1',
                avatar: 'path-to-avatar.jpeg',
                id: 'ALPHANUMERIC_ID'
            }
        },
        messages: [
            // {
            //     content: {
            //         text: 'my message kek',
            //         attachments: [],
            //         pictures: []
            //     },
            //     senderId: 'USER_ID'
            // }
        ]
    }
];

export default function chats(state = initialState, action) {
    switch (action.type) {
    case RECEIVED_NEW_MESSAGE: {
        const { message } = action.info;
        // console.log(action.info.currentUserId);
        // console.log(message.senderId);
        if (action.info.currentUserId === message.senderId) {
            return Object.assign([], state);
        }
        const neededChat = state.find(x => x.id === message.chatId);
        neededChat.messages = [...neededChat.messages, message];
        return Object.assign([], state);
    }
    case SEND_NEW_MESSAGE: {
        action.message.content.text += '(отправлено)';
        const neededChat = state.find(x => x.id === action.message.chatId);
        neededChat.messages = [...neededChat.messages, action.message];
        return Object.assign([], state);
    }
    case MESSAGE_SAVED: {
        const { userMessage } = action.info;
        const neededChat = state.find(x => x.id === userMessage.chatId);
        const neededMessage = neededChat.messages.find(m => m.userMessageId === userMessage.userMessageId);
        neededMessage.content.text += action.info.status;
        neededChat.messages = Object.assign([], neededChat.messages);

        return Object.assign([], state);
    }
    case RECEIVED_NEW_CHAT: {
        console.log(RECEIVED_NEW_CHAT);
        const { chat, currentUserId } = action.info;
        console.log(currentUserId);
        console.log(chat.creatorId);
        if (action.info.currentUserId === chat.creatorId) {
            return Object.assign([], state);
        }

        return [chat, ...state];
    }
    case SEND_NEW_CHAT: {
        const { chat } = action;
        chat.title += '(создан)';

        return [chat, ...state];
    }
    case CHAT_SAVED: {
        const { userChat } = action.info;
        const neededChat = state.find(x => x.userChatId === userChat.userChatId);
        neededChat.title += action.info.status;

        return Object.assign([], state);
    }
    default: return state;
    }
}

