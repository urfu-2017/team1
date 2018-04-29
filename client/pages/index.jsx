import React from 'react';

import styled from 'styled-components';
import io from 'socket.io-client';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import makeReducer from '../reducers/index';

import SideBar from '../containers/sidebar';
import ChatWindow from '../containers/chatWindow';

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
            socketURL: req.serverURL,
            users: req.users
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
                <MuiThemeProvider >
                    <Wrapper>
                        <SideBar />
                        <ChatWindow />
                    </Wrapper>
                </MuiThemeProvider>
            </Provider>
        );
    }
}
