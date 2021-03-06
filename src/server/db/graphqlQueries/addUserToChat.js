const gql = require('graphql-tag');

module.exports = gql`
mutation AddUserToChat($chatId: ID!, $userId: ID!) {
  addToChatOnUser(chatsChatId: $chatId, membersUserId: $userId) {
    membersUser {
      id
    }
  }
  updateUser(id: $userId, chatsUpdatedDummy: true) {
    id
  }
}
`;
