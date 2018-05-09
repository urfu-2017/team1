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
mutation CreateMessage($text: String!, $chatId: ID!, $senderId: ID!, $clientSideId: Int!, 
    $pictures: [String!] = null, $metadata: Json = null, $citationId: ID = null) {
  createMessage(text: $text, chatId: $chatId, senderId: $senderId, clientSideId: $clientSideId, 
    pictures: $pictures, metadata: $metadata, citationId: $citationId) {
    id
    ...messageData
    ...messageCitation
    sender {
      id
    }
  }
}

${fragments.messageData_ql}
${fragments.messageCitation_ql}
`;

export const CreateMessage = mapper(CREATE_MESSAGE_ql, 'createMessage');


const CREATE_CHAT_ql = gql`
mutation CreateChat($title: String!, $ownerId: ID!, $picture: String, $user1: ID!, $user2: ID!) {
  createChat(title: $title, ownerId: $ownerId, picture: $picture, membersIds: [$user1, $user2], groupchat: false) {
    id
  }
  currentUser: updateUser(id: $user1, chatsUpdatedDummy: true) {
    id
    ...userData
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
  createChat(title: $title, ownerId: $ownerId, picture: $picture, membersIds: [$userId], groupchat: true) {
    id
  }
  currentUser: updateUser(id: $userId, chatsUpdatedDummy: true) {
    id
    ...userData
    chats {
      ...chatData
    }
  }
}

${fragments.userData_ql}
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


const UPDATE_USER_AVATAR_ql = gql`
mutation UpdateUserAvatar($userId: ID!, $avatarUrl: String) {
  updateUser(id: $userId, avatarUrl: $avatarUrl) {
    id
    avatarUrl
  }
}
`;

export const UpdateUserAvatar = mapper(UPDATE_USER_AVATAR_ql, 'updateUserAvatar');

const UPDATE_MESSAGE_REACTIONS_ql = gql`
mutation updateMessageReactions($messageId: ID!, $reactions: Json) {
  updateMessage(id: $messageId, reactions: $reactions) {
    id
    reactions
  }
}
`;

export const UpdateMessageReactions = mapper(UPDATE_MESSAGE_REACTIONS_ql, 'updateMessageReactions');


const UPDATE_CHAT_TITLE_ql = gql`
mutation UpdateChatTitle($chatId: ID!, $title: String!) {
  updateChat(id: $chatId, title: $title) {
    id
    title
  }
}
`;

export const UpdateChatTitle = mapper(UPDATE_CHAT_TITLE_ql, 'updateChatTitle');


const ADD_USER_TO_CONTACTS_ql = gql`
mutation AddToContacts($userId1: ID!, $userId2: ID!) {
  addToUserOnUser(contacts1UserId: $userId1, contacts2UserId: $userId2) {
    contacts2User {
      id
    }
    contacts1User {
      id
    }
  }
  currentUser: updateUser(id: $userId1, contactsUpdatedDummy: true) {
    id
  }
  otherUser: updateUser(id: $userId2, contactsUpdatedDummy: true) {
    ...userData
  }
}

${fragments.userData_ql}
`;

export const AddUserToContacts = mapper(ADD_USER_TO_CONTACTS_ql, 'addUserToContacts');


const UPDATE_CHAT_PICTURE_ql = gql`
mutation UpdateChatPicture($chatId: ID!, $picture: String!) {
  updateChat(id: $chatId, picture: $picture) {
    id
    picture
  }
}
`;

export const UpdateChatPicture = mapper(UPDATE_CHAT_PICTURE_ql, 'updateChatPicture');
