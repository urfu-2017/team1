const gql = require('graphql-tag');


module.exports = (githubId) => gql`
query {
    viewer {
      allUsers (where: {githubId: {eq: ${githubId}}}) {
        edges {
                  node {
                      id
                      username
                      avatar
                      githubId
                  }
              }
      }
    }
  }
`