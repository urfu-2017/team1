const gql = require('graphql-tag');


module.exports = (id) => gql`
query {
    getUser (id: "${id}") {
        id
        username
        avatar
        githubId
    }
  }
`