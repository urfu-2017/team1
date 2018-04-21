const gql = require('graphql-tag');


module.exports = gql`
query ($id: ID!) {
    getUser (id: $id) {
        id
        username
        avatarUrl
        githubId
    }
}
`;
