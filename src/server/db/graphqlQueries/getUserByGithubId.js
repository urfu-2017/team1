const gql = require('graphql-tag');


module.exports = gql`
query ($where: UserWhereArgs) {
    viewer {
        allUsers (where: $where) {
            edges {
                node {
                    id
                    username
                    avatarUrl
                    githubId
                }
            }
        }
    }
}
`;
