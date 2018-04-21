import gql from 'graphql-tag';


// { message: { text, senderId, chatId } }
const CREATE_MESSAGE_ql = gql`
mutation CreateMessage($message: CreateMessageInput!) {
    createMessage(input: $message) {
        changedMessage {
            id
            createdAt
            text
            sender {
                id
            }
            chat {
                id
            }
        }
    }
}
`;

const createMessage_map = ({ mutate }) => ({
    createMessage: message => mutate({ variables: { message } })
});

export const CreateMessage = {
    query: CREATE_MESSAGE_ql,
    map: createMessage_map
};
