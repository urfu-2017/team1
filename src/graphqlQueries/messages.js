import gql from 'graphql-tag';


const CREATE_MESSAGE_ql = gql`
mutation CreateMessage($text: String!, $chatId: ID!, $senderId: ID!, $pictures: [String!]) {
  createMessage(text: $text, chatId: $chatId, senderId: $senderId, pictures: $pictures) {
    id
    createdAt
    sender {
      id
      name
      avatarUrl
    }
    pictures
    modifiedAt
    modified
  }
}
`;

const createMessage_map = ({ mutate }) => ({
    createMessage: message => mutate({ variables: { ...message } })
});

export const CreateMessage = {
    query: CREATE_MESSAGE_ql,
    map: createMessage_map
};


const SUBSCRIBE_NEW_MESSAGES_ql = gql`
subscription SubscribeToNewMessages($filter: MessageSubscriptionFilter!) {
  Message(filter: $filter) {
    mutation
    node {
      id
      text
      sender {
        id
      }
      chat {
        id
      }
      createdAt
    }
  }
}
`;

const subscribeNewMessages_vars = (chatId) => ({
    filter: {
        mutation_in: "[CREATED]",
        node: {
            chat: {
                id: chatId
            }
        }
    }
});


export const SubscribeNewMessages = {
    query: SUBSCRIBE_NEW_MESSAGES_ql,
    vars: subscribeNewMessages_vars
};
