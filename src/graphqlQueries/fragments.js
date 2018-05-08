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
  sender {
    id
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
