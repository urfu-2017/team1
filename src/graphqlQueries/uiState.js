import React from 'react';
import gql from 'graphql-tag';


export const OPENED_CHAT_ql = gql`
{
    ui @client {
        isParanjaOpened
        selectedChatId
    }
}
`;
