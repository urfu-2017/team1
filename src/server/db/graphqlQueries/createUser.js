const gql = require('graphql-tag');


module.exports.CREATE_USER_ql = gql`
mutation CreateUser($name: String!, $githubId: Int!, $avatarUrl: String!) {
  createUser(name: $name, githubId: $githubId, avatarUrl: $avatarUrl) {
    id
    name
    githubId
    createdAt
    avatarUrl
  }
}
`;
