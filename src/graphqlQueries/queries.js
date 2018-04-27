import gql from 'graphql-tag';

import * as fragments from './fragments';


const mapper = (query, selector) => ({
    query,
    map: (req) => ({
        data: req.data,
        loading: req.data.loading,
        error: req.data.error,
        ...selector(req.data)
    })
});


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

export const GetUserChats = mapper(GET_CHAT_INFO_ql, data => data.User);


const GET_CHAT_ql = gql`
    query GetChat($chatId: ID!) {
        Chat(id: $chatId) {
            id
            title
            private
            picture
            modifiedAt
            createdAt
            members {
                id
                name
                avatarUrl
            }
            messages {
                id
                text
                sender {
                    id
                }
                createdAt
                modifiedAt
                modified
            }
        }
    }
`;

const getChat_map = ({ data }) => {
    if (!data.Chat) {
        return {
            loading: data.loading
        };
    }

    return {
        loading: data.loading,
        error: data.error,
        ...data.Chat
    };
};


export const GetChat = {
    query: GET_CHAT_ql,
    map: getChat_map
};


const GET_CHAT_MESSAGES_ql = gql`
query GetChatMessages($chatId: ID!) {
  Chat(id: $chatId) {
    id
    messages {
      ...messageData
      sender {
        ...userData
      }
    }
  }
}

${fragments.messageData_ql}
${fragments.userData_ql}
`;

export const GetChatMessages = mapper(GET_CHAT_MESSAGES_ql, data => data.Chat);


const GET_CHAT_INFO_ql = gql`
query GetChatInfo($chatId: ID!) {
  Chat(id: $chatId) {
    id
    ...chatData
  }
}

${fragments.chatData_ql}
`;

export const GetChatInfo = mapper(GET_CHAT_INFO_ql, data => data.Chat);
