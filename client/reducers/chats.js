import {
    RECEIVED_NEW_MESSAGE,
    RECEIVED_NEW_CHAT,
    SEND_NEW_MESSAGE,
    MESSAGE_SAVED,
    SEND_NEW_CHAT,
    CHAT_SAVED
} from '../actions/actions';

export default function createChatReducer(chatProps) {
    const newInitialState = Object.assign([], chatProps);
    return (state = newInitialState, action) => {
        switch (action.type) {
        case RECEIVED_NEW_MESSAGE: {
            const { message, sender } = action.info;
            const neededChat = state.find(x => x.id === message.chatId);
            neededChat.lastMessage = message;
            neededChat.lastMessage.sender = sender;
            neededChat.lastMessage = Object.assign({}, neededChat.lastMessage);
            // TODO:
            if (action.info.currentUserId === message.senderId) {
                return Object.assign([], state);
            }
            neededChat.messages = [...neededChat.messages, message];
            
            return Object.assign([], state);
        }
        case SEND_NEW_MESSAGE: {
            // action.message.content.text += '(отправлено)';
           
            const neededChat = state.find(x => x.id === action.message.chatId);
            if (!neededChat.messages) {
                neededChat.messages = [];
            }
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
            console.log(chat);
            // TODO:
            // if (action.info.currentUserId === chat.creatorId) {
            //     return Object.assign([], state);
            // }
            let newState = [...state, chat];
            return Object.assign([], newState);
        }
        case SEND_NEW_CHAT: {
            const { chat } = action;
            // chat.title += '(создан)';

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
    };
}
