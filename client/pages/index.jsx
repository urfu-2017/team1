import React from 'react';

import styled from 'styled-components';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import makeReducer from '../reducers/index';
import SideBar from '../containers/sidebar';
import Chat from '../containers/chat';

const Wrapper = styled.main`
    height: 100%;
    max-width: 1260px;
    display: flex;
    margin: 0 auto;
    overflow: hidden;
`;

export default class KilogrammApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.store = createStore(makeReducer(props), applyMiddleware(thunk));
    }

    static async getInitialProps({ req }) {
        return { user: req.user };
    }

    render() {
        return (
            <Provider store={this.store}>
                <Wrapper>
                    <SideBar />
                    <Chat />
                </Wrapper>
            </Provider>
        );
    }
}
