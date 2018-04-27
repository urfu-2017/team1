import gql from 'graphql-tag';

import * as fragments from './fragments';


const mapper = (query, selector, name) => ({
    query,
    map: (req) => {
        const props = {
            data: req.data,
            loading: req.data.loading,
            error: req.data.error
        };
        props[name] = selector(req.data);
        return props;
    }
});


const GET_USER_ql = gql`
query GetUser($userId: ID!) {
  User(id: $userId) {
    ...userData
  }
}

${fragments.userData_ql}
`;

export const GetUser = mapper(GET_USER_ql, data => data.User, 'user');


// TODO: dummy implementation
export const GET_USER_CONTACTS_ql = gql`
query GetUserContacts {
    allUsers {
        id
        name
        avatarUrl
        createdAt
    }
}
`;

// export const GET_USER_CONTACTS_ql = gql`
// query GetUserContacts($userId: ID!) {
//   User(id: $userId) {
//     id
//     contacts {
//       ...userData
//     }
//   }
// }
//
// ${fragments.userData_ql}
// `;


const GET_USER_CHATS_ql = gql`
query GetUserChats($userId: ID!) {
  User(id: $userId) {
    id
    chats {
      ...chatData
    }
  }
}

${fragments.chatData_ql}
`;

export const GetUserChats = mapper(GET_USER_CHATS_ql, data => data.User, 'chats');


const GET_CHAT_MESSAGES_ql = gql`
query GetChatMessages($chatId: ID!) {
  Chat(id: $chatId) {
    id
    messages {
      ...messageData
    }
  }
}

${fragments.messageData_ql}
`;

export const GetChatMessages = mapper(GET_CHAT_MESSAGES_ql,
        data => data.Chat && data.Chat.messages, 'messages');


const GET_CHAT_INFO_ql = gql`
query GetChatInfo($chatId: ID!) {
  Chat(id: $chatId) {
    id
    ...chatData
    members {
      ...userData
    }
  }
}

${fragments.chatData_ql}
${fragments.userData_ql}
`;

export const GetChatInfo = mapper(GET_CHAT_INFO_ql, data => data.Chat, 'chat');
