import React from 'react';
import gql from 'graphql-tag';


export const CURRENT_USER_ql = gql`
{
    currentUser @client {
        id
        name
    }
}
`;
