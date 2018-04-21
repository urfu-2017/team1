const gql = require('graphql-tag');


exports.ADD_CHAT_MEMBER_ql = gql`
mutation AddChatMember($member: AddToChatMembersConnectionInput!) {
  addToChatMembersConnection(input: $member) {
    changedChatMembers {
      user {
        chats {
          edges {
            node {
              id
            }
          }
        }
      }
      chat {
        members {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
}
`;
