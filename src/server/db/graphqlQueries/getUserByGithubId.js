const gql = require('graphql-tag');


module.exports = gql`
query GetUser($githubId: Int!) {
  User(githubId: $githubId) {
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
