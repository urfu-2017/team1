const gql = require('graphql-tag');


module.exports.CREATE_USER_ql = gql`
mutation CreateUser($user: CreateUserInput!) {
    createUser(input: $user) {
        changedUser {
            id
            username
            avatarUrl
            githubId
        }
    }
}
`;
