import gql from 'graphql-tag';

import * as fragments from './fragments';
import {processChat} from './dataHandlers';
import {idXor} from '../lib/idXor';


const mapper = (query, selector, name, variables) => ({
    query,
    map: (req) => {
        const props = {
            data: req.data,
            loading: req.data && req.data.loading || !req.data && true,
            error: req.data && req.data.error || null
        };
        if (req.data) {
            props[name] = selector(req.data);
        }
        return props;
    },
    variables
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
    isNightTheme
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
      ...messageCitation
      ...forwardedMessages
    }
  }
}

${fragments.messageData_ql}
${fragments.messageCitation_ql}
${fragments.forwardedMessages_ql}
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


const GET_USER_LAST_MESSAGE_CHAT_TO_USER_ql = userId => gql`
query GetLastMessageChatToUser {
  allLastMessageChatToUsers(filter: {
    userId: "${userId}"
  }) {
    id,
    chatId,
    message {
      id,
      createdAt
    }
  }
}
`;

export const GetUserLastMessageChatToUser = mapper(
  GET_USER_LAST_MESSAGE_CHAT_TO_USER_ql,
  data => data.allLastMessageChatToUsers,
  'allLastMessageChatToUsers'
);


const GET_LAST_MESSAGE_CHAT_TO_USER_ql = (userId, chatId) => gql`
query GetLastMessageChatToUser {
  allLastMessageChatToUsers(filter: {
    AND: [{
      chatId: "${chatId}"
    }, {
      userId: "${userId}"
    }]
  }) {
    id
  }
}
`;

export const GetLastMessageChatToUser = mapper(
  GET_LAST_MESSAGE_CHAT_TO_USER_ql, 
  data => data.allLastMessageChatToUsers,
  'allLastMessageChatToUsers'
);


const SEARCH_MESSAGES_ql = gql`
query SearchMessages($filter: MessageFilter!) {
  allMessages(filter: $filter, orderBy: createdAt_DESC) {
    id
    rawText
    createdAt
    citation {
      id
      rawText
    }
    forwardedMessages {
      id
      rawText
    }
    chat {
      id
    }
    sender {
      id
      name
    }
  }
}
`;

const searchMessages_vars = (currentuserId, substring) => ({
    filter: {
        chat: {
            members_some: {
                id: currentuserId
            }
        },
        OR: [
            { rawText_contains: substring },
            { forwardedMessages_some: { rawText_contains: substring } },
            { citation: { rawText_contains: substring } },
        ]
    }
});


export const SearchMessages = {
    query: SEARCH_MESSAGES_ql,
    map: (req) => {
        const props = {
            data: req.data,
            loading: req.data && req.data.loading || !req.data && true,
            error: req.data && req.data.error || null
        };
        if (req.data.allMessages) {
            props.searchMessages = req.data.allMessages
                .reduce((acc, curr) => {
                    if (!curr.forwardedMessages.length) {
                        acc.push(curr);
                    } else {
                        acc.push(...curr.forwardedMessages.map((msg, i) => ({
                            ...msg, id: idXor(curr.id, msg.id) + i,
                            sender: curr.sender, chat: curr.chat,
                            createdAt: curr.createdAt
                        })))
                    }
                    return acc;
                }, [])
                .map(msg => {
                    const rawText = [msg.rawText, msg.citation && msg.citation.rawText]
                        .filter(Boolean)
                        .join('\n');
                    return { ...msg, rawText };
                });
        }
        return props;
    },
    variables: searchMessages_vars
};
