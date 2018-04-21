import gql from 'graphql-tag';


// { userId }
const GET_USER_CHATS_ql = gql`
query GetUserChats($userId: ID!) {
  getUser(id: $userId) {
    id
    chats {
      edges {
        node {
          id
          name
        }
      }
    }
  }
}
`;

const getUserChats_map = ({ data }) => {
    if (!data.getUser) {
        return {
            loading: data.loading
        };
    }

    const edges = data.getUser.chats.edges;

    return {
        loading: data.loading,
        chats: edges.map(edge => edge.node)
    };
};


export const GetUserChats = {
    query: GET_USER_CHATS_ql,
    map: getUserChats_map
};



// { userId, chatId }
export const ADD_CHAT_MEMBER_ql = gql`
mutation AddChatMember($ids: AddToChatMembersConnectionInput!) {
  addToChatMembersConnection(input: $ids) {
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
