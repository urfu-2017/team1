import gql from 'graphql-tag';


export const messageData_ql = gql`
fragment messageData on Message {
  id
  text
  pictures
  createdAt
  modifiedAt
  metadata
  clientSideId
  reactions
  lifeTimeInSeconds
  sender {
    id
  }
}
`;

export const messageCitation_ql = gql`
fragment messageCitation on Message {
  citation {
    id
    text
    pictures
    sender {
      id
      name
    }
  }
}  
`;

export const forwardedMessages_ql = gql`
fragment forwardedMessages on Message {
  forwardedMessages {
    id
    text
    createdAt
    pictures
    citation {
      id
      text
      pictures
      sender {
        id
        name
      }
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

export const userData_ql = gql`
fragment userData on User {
  id
  name
  avatarUrl
}
`;

export const userMeta_ql = gql`
fragment userMeta on User {
  id
  githubId
  createdAt
}
`;

export const chatData_ql = gql`
fragment chatData on Chat {
  id
  title
  picture
  createdAt
  groupchat
  members {
    id
    name
    avatarUrl
  }
}
`;

export const lastMessageChatToUser_ql = gql`
fragment lastMessageChatToUserData on LastMessageChatToUser {
  id,
  message {
    createdAt
  }
}
`
