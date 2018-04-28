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


const CREATE_CHAT_ql = gql`
mutation CreateChat($title: String!, $ownerId: ID!, $picture: String, $user1: ID!, $user2: ID!) {
  createChat(title: $title, ownerId: $ownerId, picture: $picture, membersIds: [$user1, $user2]) {
    ...chatData
    members {
      ...userData
    }
  }
  currentUser: updateUser(id: $user1, chatsUpdatedDummy: true) {
    id
    chats {
      ...chatData
    }
  }
  contact: updateUser(id: $user2, chatsUpdatedDummy: true) {
    id
  }
}

${fragments.chatData_ql}
${fragments.userData_ql}
`;

export const CreateChat = mapper(CREATE_CHAT_ql, 'createChat');


const CREATE_GROUP_CHAT_ql = gql`
mutation CreateGroupChat($title: String!, $ownerId: ID!, $picture: String, $userId: ID!) {
  createChat(title: $title, ownerId: $ownerId, picture: $picture, membersIds: [$userId]) {
    ...chatData
  }
  currentUser: updateUser(id: $userId, chatsUpdatedDummy: true) {
    id
    chats {
      ...chatData
    }
  }
}

${fragments.chatData_ql}
`;

export const CreateGroupChat = mapper(CREATE_GROUP_CHAT_ql, 'createGroupChat');


const ADD_USER_TO_CHAT_ql = gql`
mutation AddUserToChat($chatId: ID!, $userId: ID!) {
  addToChatOnUser(chatsChatId: $chatId, membersUserId: $userId) {
    membersUser {
      id
      chats {
        id
      }
    }
  }
  updateUser(id: $userId, chatsUpdatedDummy: true) {
    id
  }
}
`;

export const AddUserToChat = mapper(ADD_USER_TO_CHAT_ql, 'addUserToChat');
