import React from 'react';
import gql from 'graphql-tag';


export const ALL_CHATS_ql = gql`
query {
    allChats @client {
        id
        title
        lastMessage {
            content {
                text
            }
            sender {
                name
            }
        }
    }
}
`; 