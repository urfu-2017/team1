import gql from 'graphql-tag';

import * as fragments from './fragments';
import {GetChatMessages} from './queries';
import {addNewMessage} from './dataHandlers';


export const getCreatedAt = () => (new Date()).toISOString();

export const getClientSideId = () => -Math.floor(Math.random() * 1000 * 1000);


const mapper = (mutation, funcName, update, optimisticResponse) => ({
    mutation,
    update,
    optimisticResponse,
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
mutation CreateMessage($text: String!, $rawText: String, $chatId: ID!, $senderId: ID!, $clientSideId: Int!, 
    $pictures: [String!] = null, $metadata: Json = null, $citationId: ID = null,
    $lifeTimeInSeconds: Int, $map: Json = null, $forwardedMessagesIds: [ID!]) {
  createMessage(text: $text, rawText: $rawText, chatId: $chatId, senderId: $senderId, clientSideId: $clientSideId, 
    pictures: $pictures, metadata: $metadata, citationId: $citationId,
    lifeTimeInSeconds: $lifeTimeInSeconds, map: $map, forwardedMessagesIds: $forwardedMessagesIds) {
    id
    ...messageData
    ...messageCitation
    ...forwardedMessages
    sender {
      id
    }
  }
}

${fragments.messageData_ql}
${fragments.messageCitation_ql}
${fragments.forwardedMessages_ql}
`;


const createMessage_optimistic = (message, citedMessage, forwardedMessages = []) => ({
    __typename: 'Mutation',
    createMessage: {
        id: message.clientSideId,
        createdAt: getCreatedAt(),
        modifiedAt: null,
        sender: {
            id: message.senderId,
            __typename: 'User'
        },
        metadata: null,
        reactions: null,
        map: null,
        ...message,
        lifeTimeInSeconds: message.lifeTimeInSeconds || null,
        forwardedMessages,
        citation: message.citationId && {
            ...citedMessage
        },
        __typename: 'Message'
    }
});


const createMessage_update = (chatId, cache, { data: { createMessage } }) => {
    let query;
    try {
        query = GetChatMessages.query(chatId);
    } catch (exc) {
        // если кэш не заполнен
        return;
    }
    const variables = { chatId };
    const data = cache.readQuery({
        query,
        variables
    }, true);
    const updated = addNewMessage(createMessage, data);
    cache.writeQuery({ query, data: updated });
    console.log('CREATE UPDATED');
};


export const CreateMessage = mapper(CREATE_MESSAGE_ql, 'createMessage',
    createMessage_update, createMessage_optimistic);


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

const createChat_optimistic = (currentUser, contact) => {
    const id = -Math.floor(Math.random() * 1000);
    const chat = {
        id,
        title: contact.name,
        picture: contact.avatarUrl,
        createdAt: (new Date()).toISOString(),
        groupchat: false,
        members: [currentUser, contact].map(
            ({ id, name, avatarUrl }) => ({ id, name, avatarUrl, __typename: 'User' })),
        __typename: 'Chat'
    };
    const updatedCurrentUser = {
        ...currentUser,
        chats: [...currentUser.chats].concat([chat])
    };
    return {
        __typename: 'Mutation',
        createChat: {
            id,
            __typename: 'Chat'
        },
        currentUser: {
            ...updatedCurrentUser,
            __typename: 'User'
        },
        contact: {
            id: contact.id,
            __typename: 'User'
        }
    };
};

export const CreateChat = mapper(CREATE_CHAT_ql, 'createChat', null, createChat_optimistic);


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


const UPDATE_USER_ISNIGHTTHEME_ql = gql`
mutation UpdateUserIsNightTheme($userId: ID!, $isNightTheme: Boolean!) {
  updateUser(id: $userId, isNightTheme: $isNightTheme) {
    id
    isNightTheme
  }
}
`;

const updateUserIsNightTheme_optimistic = (userId, isNightTheme) => ({
    updateUser: {
        id: userId,
        isNightTheme,
        __typename: 'User'
    }
});

export const UpdateUserIsNightTheme = mapper(UPDATE_USER_ISNIGHTTHEME_ql, 'updateUserIsNightTheme',
    null, updateUserIsNightTheme_optimistic);


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

const DELETE_MESSAGE_ql = gql`
mutation DeleteMessage($messageId: ID!) {
  deleteMessage(id: $messageId) {
    id
  }
}
`;

export const DeleteMessage = mapper(DELETE_MESSAGE_ql, 'deleteMessage');
