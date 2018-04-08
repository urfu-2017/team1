import React from 'react';
import styled from 'styled-components';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from '../reducers/index';
import SideBar from '../containers/sidebar';
import Chat from '../containers/chat';

const store = createStore(reducer);

const Wrapper = styled.main`
    height: 100%;
    max-width: 1260px;
    display: flex;
    margin: 0 auto;
    overflow: hidden;
`;

export default class ChatApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Provider store={store}>
                <Wrapper>
                    <SideBar />
                    <Chat />
                </Wrapper>
            </Provider>
        );
    }
}
