import React from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from '../reducers/index';
import SideBar from '../containers/sidebar';
import Chat from '../containers/chat';

const store = createStore(reducer);

const Wrapper = styled.main`
    display: flex;

    height: 100%;
    width: 100%;
`;

export default class ChatApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    componentDidMount() {
        this.socket = io('http://localhost:3000/');
        this.socket.on('now', data => {
            const message = {
                id: 3,
                content: data.message,
                createAt: '12:09'
            };
            this.setState({
                messages: [...this.state.messages, message]
            });
        });
    }

    componentWillUnmount() {
        this.socket.off('now');
        this.socket.close();
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
