import gql from 'graphql-tag';

import * as fragments from './fragments';


const mapper = (subscription, filterFactory) => ({
    subscription,
    vars: (...vars) => ({
        filter: filterFactory(...vars)
    })
});


const SUBSCRIBE_TO_MESSAGES_ql = gql`
subscription SubscribeToMessages($filter: MessageSubscriptionFilter!) {
  Message(filter: $filter) {
    mutation
    node {
      ...messageData
      ...messageCitation
      ...forwardedMessages
      chat {
        id
      }
    }
    previousValues {
        id
    }
  }
}

${fragments.messageData_ql}
${fragments.messageCitation_ql}
${fragments.forwardedMessages_ql}
`;

export const SubscribeToMessages = mapper(SUBSCRIBE_TO_MESSAGES_ql,
    (chatId, currentUserId) => ({
        node: {
            chat: {
                id: chatId
            },
            // Отключает получение сообщения отправителем, но...
            // Что, если чат открыт в двух вкладках? Вариант - сделать как у Телеграм, но как?
            // sender: {
            //     id_not: currentUserId
            // }
        }
    })
);


const SUBSCRIBE_TO_CURRENT_USER_ql = gql`
subscription SubscribeToUser($filter: UserSubscriptionFilter!) {
  User(filter: $filter) {
    mutation
    node {
      ...userData
      chats {
        ...chatData
      }
    }
  }
}

${fragments.userData_ql}
${fragments.chatData_ql}
`;

export const SubscribeToCurrentUser = mapper(SUBSCRIBE_TO_CURRENT_USER_ql,
    userId => ({
        node: {
            id: userId
        },
        // updatedFields_contains: 'chatsUpdatedDummy'
    })
);


const SUBSCRIBE_TO_USER_ql = gql`
subscription SubscribeToUser($filter: UserSubscriptionFilter!) {
  User(filter: $filter) {
    mutation
    node {
      ...userData
    }
  }
}

${fragments.userData_ql}
`;

export const SubscribeToUser = mapper(SUBSCRIBE_TO_USER_ql,
    userId => ({
        node: {
            id: userId
        },
        // updatedFields_contains: 'chatsUpdatedDummy'
    })
);

export const SubscribeToUsersInChat = mapper(SUBSCRIBE_TO_USER_ql,
    chatId => ({
        node: {
            chats_some: {
                id: chatId
            }
        }
    })
);

export const SubscribeToUsersHavingPersonalChats = mapper(SUBSCRIBE_TO_USER_ql,
    currentUserId => ({
        node: {
            chats_some: {
                groupchat: false,
                members_some: {
                    id: currentUserId
                }
            }
        }
    })
);


const SUBSCRIBE_TO_CHAT_ql = gql`
subscription SubscribeToChat($filter: ChatSubscriptionFilter!) {
  Chat(filter: $filter) {
    mutation
    node {
      ...chatData
    }
  }
}

${fragments.chatData_ql}
`;

export const SubscribeToChat = mapper(SUBSCRIBE_TO_CHAT_ql,
    chatId => ({
        node: {
            id: chatId
        }
    })
);


export const SubscribeToUserChats = mapper(SUBSCRIBE_TO_CHAT_ql,
    userId => ({
        node: {
            members_some: {
                id: userId
            }
        }
    })
);
