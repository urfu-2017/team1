import React from 'react';
import gql from 'graphql-tag';


const GET_LOCAL_STATE_ql = gql`
query GetLocalState {
    localState @client {
        currentChatId
        serverUrl
    }
}
`;

const getLocalState_map = ({ data }) => ({
    localState: {
        ...data,
        ...data.localState
    }
});

export const GetLocalState = {
    query: GET_LOCAL_STATE_ql,
    map: getLocalState_map
};


const GET_UI_THEME_ql = gql`
query GetUiTheme {
    uiTheme @client {
        isNightTheme
    }
}
`;

const getUiTheme_map = ({ data }) => ({
    uiTheme: {
        ...data,
        isNightTheme: false,
        ...data.uiTheme
    }
});

export const GetUiTheme = {
    query: GET_UI_THEME_ql,
    map: getUiTheme_map
};



const UPDATE_CURRENT_CHAT_ID_ql = gql`
mutation UpdateCurrentChatId($id: ID!) {
    updateCurrentChatId(id: $id) @client
}
`;

const updateCurrentChatId_map = ({ mutate }) => ({
    updateCurrentChatId: id => mutate({ variables: { id } })
});

export const UpdateCurrentChatId = {
    mutation: UPDATE_CURRENT_CHAT_ID_ql,
    map: updateCurrentChatId_map
};


const UPDATE_THEME_ql = gql`
mutation UpdateTheme($isNightTheme: Boolean!) {
    updateTheme(isNightTheme: $isNightTheme) @client
}
`;

const updateTheme_map = ({ mutate }) => ({
    updateTheme: isNightTheme => mutate({ variables: { isNightTheme } })
});

export const UpdateTheme = {
    mutation: UPDATE_THEME_ql,
    map: updateTheme_map
};

