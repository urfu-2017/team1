import React from 'react';
import gql from 'graphql-tag';


export const GET_CURRENT_CHAT_ID_ql = gql`
query GetCurrentChatId {
    currentChatId @client
}
`;


const UPDATE_CURRENT_CHAT_ID_ql = gql`
mutation UpdateCurrentChatId($id: ID!) {
    updateCurrentChatId(id: $id) @client
}
`;

const updateCurrentChatId_map = ({ mutate }) => ({
    updateCurrentChatId: id => mutate({ variables: { id } })
});

export const UpdateCurrentChatId = {
    query: UPDATE_CURRENT_CHAT_ID_ql,
    map: updateCurrentChatId_map
};
