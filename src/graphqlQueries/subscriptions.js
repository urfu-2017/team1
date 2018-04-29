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
    }
  }
}

${fragments.messageData_ql}
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
      chats {
        ...chatData
      }
    }
  }
}

${fragments.userData_ql}
${fragments.chatData_ql}
`;

export const SubscribeToUser = mapper(SUBSCRIBE_TO_USER_ql,
    userId => ({
        node: {
            id: userId
        },
        // updatedFields_contains: 'chatsUpdatedDummy'
    })
);
