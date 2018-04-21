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


