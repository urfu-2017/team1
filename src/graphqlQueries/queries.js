import gql from 'graphql-tag';

import * as fragments from './fragments';
import {processChat} from '../lib/dataHandlers';


const mapper = (query, selector, name) => ({
    query,
    map: (req) => {
        const props = {
            data: req.data,
            loading: req.data.loading,
            error: req.data.error
        };
        if (req.data) {
            props[name] = selector(req.data);
        }
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


const GET_CURRENT_USER_ql = gql`
query GetUser($userId: ID!) {
  User(id: $userId) {
    ...userData
    chats {
      ...chatData
    }
  }
}

${fragments.userData_ql}
${fragments.chatData_ql}
`;

const GetCurrentUser_map = req => {
    let chats = null;
    if (req.User) {
        const currentUserId = req.User.id;
        chats = req.User.chats.map(chat => processChat(currentUserId, chat));
    }
    return {
        ...req,
        ...req.User,
        chats
    };
};

export const GetCurrentUser = mapper(GET_CURRENT_USER_ql, GetCurrentUser_map, 'currentUser');


const GET_USER_CONTACTS_ql = gql`
query GetUserContacts($userId: ID!) {
  User(id: $userId) {
    id
    contacts {
      ...userData
    }
  }
}

${fragments.userData_ql}
`;

export const GetUserContacts = mapper(GET_USER_CONTACTS_ql, data => data.User && data.User.contacts, 'contacts');


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

export const GetUserChats = mapper(GET_USER_CHATS_ql, data => data.User && data.User.chats, 'chats');


const GET_CHAT_MESSAGES_ql = chatId => gql`
query GetChatMessages {
  Chat(id: "${chatId}") {
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


const GET_CHAT_MEMBERS_ql = gql`
query GetChatMembers($chatId: ID!) {
  Chat(id: $chatId) {
    id
    members {
      ...userData
    }
  }
}

${fragments.userData_ql}
`;

export const GetChatMembers = mapper(GET_CHAT_MEMBERS_ql,
    data => data.Chat && data.Chat.members, 'members');


const GET_CHAT_INFO_ql = gql`
query GetChatInfo($chatId: ID!) {
  Chat(id: $chatId) {
    id
    ...chatData
  }
}

${fragments.chatData_ql}
`;

export const GetChatInfo = mapper(GET_CHAT_INFO_ql, data => data.Chat, 'chat');


const GET_ALL_USERS_ql = gql`
query GetAllUsers {
    allUsers {
        ...userData
    }
}

${fragments.userData_ql}
`;

export const GetAllUsers = mapper(GET_ALL_USERS_ql, data => data.allUsers, 'allUsers');


const GET_ALL_CHATS_ql = gql`
query GetAllChats {
    allChats {
        ...chatData
    }
}

${fragments.chatData_ql}
`;

export const GetAllChats = mapper(GET_ALL_CHATS_ql, data => data.allChats, 'allChats');
