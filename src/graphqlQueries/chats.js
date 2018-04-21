import gql from 'graphql-tag';


const _mapEdgesToNodes = collection => collection.edges.map(e => e.node);


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

    return {
        loading: data.loading,
        chats: _mapEdgesToNodes(data.getUser.chats)
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


const GET_CHAT_ql = gql`
query GetChat($chatId: ID!) {
    getChat(id: $chatId) {
        name
        private
        modifiedAt
        createdAt
        id
        
        owner {
            id
        }
        
        members {
            edges {
                node {
                    id
                    username
                    avatarUrl
                }
            }
        }
    
        messages {
            edges {
                node {
                    id
                    text
                    sender {
                        id
                    }
                }
            }
        }
    }    
}
`;

const getChat_map = ({ data }) => {
    if (!data.getChat) {
        return {
            loading: data.loading
        };
    }

    return {
        loading: data.loading,
        error: data.error,
        messages: _mapEdgesToNodes(data.getChat.messages),
        members: _mapEdgesToNodes(data.getChat.members),
        name: data.name,
        owner: data.owner,
        'private': data.private,
        modifiedAt: data.modifiedAt,
        createdAt: data.createdAt
    };
};


export const GetChat = {
    query: GET_CHAT_ql,
    map: getChat_map
};
