const gql = require('graphql-tag');


module.exports = gql`
query GetUser($id: ID!) {
  User(id:$id) {
    id
    name
    githubId
    avatarUrl
    createdAt
    chats {
      id
    }
  }
}
`;
