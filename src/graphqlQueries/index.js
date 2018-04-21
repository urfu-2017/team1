import { gql } from 'graphql-tag';


export const CREATE_USER_ql = gql`
mutation CreateUser($user: CreateUserInput!) {
  createUser(input: $user) {
    changedUser {
      id
      username
      createdAt
      contacts {
        edges {
          node {
            username
          }
        }
      }
    }
  }
}
`;


export const ADD_CHAT_MEMBER_ql = gql`
mutation AddChatMember($member: AddToChatMembersConnectionInput!) {
  addToChatMembersConnection(input: $member) {
    changedChatMembers {
      user {
        chats {
          edges {
            node {
              id
            }
          }
        }
      }
      chat {
        members {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
}
`;
