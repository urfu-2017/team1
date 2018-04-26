import gql from 'graphql-tag';


const GET_USER_CHATS_ql = gql`
query GetUserChats($userId: ID!) {
  User(id: $userId) {
    id
    chats {
      id
      title
      picture
    }
  }
}
`;

const getUserChats_map = ({ data }) => {
    if (!data.User) {
        return {
            loading: data.loading
        };
    }

    return {
        loading: data.loading,
        ...data.User
    };
};


export const GetUserChats = {
    query: GET_USER_CHATS_ql,
    map: getUserChats_map
};


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


export const CREATE_CHAT_ql = gql`
mutation CreateChat($title: String!, $ownerId: ID!, $picture: String, $user1: ID!, $user2: ID!) {
  createChat(title: $title, ownerId: $ownerId, picture: $picture, membersIds: [$user1, $user2]) {
    id
    createdAt
    picture
    modifiedAt,
    members {
      id
    }
  }
  currentUser: updateUser(id: $user1, chatsUpdatedDummy: true) {
    id,
    chats {
      id
      title
      picture
    }
  }
  contact: updateUser(id: $user2, chatsUpdatedDummy: true) {
    id
  }
}
`;


const ADD_CHAT_MEMBER_ql = gql`
mutation AddUserToChat($chatId: ID!, $userId: ID!) {
  addToChatOnUser(chatsChatId: $chatId, membersUserId: $userId) {
    membersUser {
      id
      chats {
        id
      }
    }
  }
}
`;
