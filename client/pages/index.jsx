import React from 'react';

import styled from 'styled-components';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import makeReducer from '../reducers/index';
import SideBar from '../containers/sidebar';
import ChatWindow from '../containers/chatWindow';
import io from 'socket.io-client';
import { addMessageFromSocket } from '../actions/actions';


const Wrapper = styled.main`
    height: 100%;
    max-width: 1260px;
    display: flex;
    margin: 0 auto;
    overflow: hidden;
`;

export default class KilogrammApp extends React.Component {
    static async getInitialProps({ req }) {
        return {
            user: req.user,
            serverURL: req.serverURL,
            chatSocketPrefix: req.chatSocketPrefix,
            newChatsSocketPrefix: req.newChatsSocketPrefix,
            users: req.users,
            chats: req.chats
        };
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.store = createStore(makeReducer(props), applyMiddleware(thunk));
    }

    render() {
        return (
            <Provider store={this.store}>
                <Wrapper>
                    <SideBar />
                    <ChatWindow />
                </Wrapper>
            </Provider>
        );
    }
}
