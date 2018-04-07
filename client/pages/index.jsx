import React from 'react';

import styled from 'styled-components';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from '../reducers/index';
import SideBar from '../containers/sidebar';
import Chat from '../containers/chat';

const Wrapper = styled.main`
    display: flex;
    height: 100%;
    width: 100%;
`;

const store = createStore(reducer);

export default class KilogrammApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    sendMessage = () => {
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
