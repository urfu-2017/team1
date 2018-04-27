import gql from 'graphql-tag';

import * as fragments from './fragments';


const mapper = (mutation, funcName) => ({
    mutation,
    map: ({ mutate }) => {
        const funcs = {};
        funcs[funcName] = (variables, options) => mutate({
            variables,
            ...options
        });
        return funcs;
    }
});


const CREATE_MESSAGE_ql = gql`
mutation CreateMessage($text: String!, $chatId: ID!, $senderId: ID!, $pictures: [String!]) {
  createMessage(text: $text, chatId: $chatId, senderId: $senderId, pictures: $pictures) {
    id
    ...messageData
    sender {
      id
    }
  }
}

${fragments.messageData_ql}
`;

export const CreateMessage = mapper(CREATE_MESSAGE_ql, 'createMessage');
