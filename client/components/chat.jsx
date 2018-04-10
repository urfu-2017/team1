import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import { ChatWrapper, ChatHeader, LastMessage, Sender } from '../styles/chat';

import { addMessageFromSocket } from '../actions/actions';

class Chat extends Component {
    static propTypes = {
        chat: PropTypes.object,
        select: PropTypes.bool,
        onClick: PropTypes.func,
        dispatch: PropTypes.func,
        currentUserId: PropTypes.string,
        meta: PropTypes.object
    }

    static defaultProps = {
        chat: {},
        select: false,
        onClick: {},
        dispatch: {},
        currentUserId: null,
        meta: {}
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { serverURL, chatSocketPrefix } = this.props.meta;
        const chatId = this.props.chat.id;
        this.socket = io(serverURL);
        this.socket.on(`${chatSocketPrefix}-${chatId}`, data => {
            const { currentUserId } = this.props;
            this.props.dispatch(addMessageFromSocket(data.message, currentUserId));
        });
        this.socket.emit('gib', {});
    }

    componentWillUnmount() {
        this.socket.off('now');
        this.socket.close();
    }

    render() {
        const { onClick, chat, select } = this.props;
        return (
            <ChatWrapper onClick={onClick} select={select}>
                <ChatHeader>{chat.title}</ChatHeader>
                <LastMessage>
                    <Sender>{chat.lastMessage.sender.name}:</Sender>
                    <span>{chat.lastMessage.content.text}</span>
                </LastMessage>
            </ChatWrapper>
        );
    }
}

export default connect()(Chat);
