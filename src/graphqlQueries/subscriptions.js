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
            sender: {
                id_not: currentUserId
            }
        }
    })
);
