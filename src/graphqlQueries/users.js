import gql from 'graphql-tag';


// TODO: dummy implementation
export const GET_USER_CONTACTS_ql = gql`
query GetUserContacts {
    allUsers {
        id
        name
        avatarUrl
        createdAt
    }
}
`;


export const SUBSCRIBE_USER_CHATS_UPDATES_ql = gql`
subscription SubscribeToNewChats($filter: UserSubscriptionFilter!) {
  User(filter: $filter) {
    mutation
    node {
      id
      chats {
        id
        title
        picture
        owner {
          id
        }
      }
    }
  }
}
`;
