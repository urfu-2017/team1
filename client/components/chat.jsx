import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import { ChatWrapper, ChatHeader, LastMessage, Sender } from '../styles/chat';

import { addMessageFromSocket, cursorIsPressedFromBelow, moveCursorDown } from '../actions/actions';
import { getChatName } from '../utils/chats';

class Chat extends Component {
    static propTypes = {
        chat: PropTypes.object,
        select: PropTypes.bool,
        onClick: PropTypes.func,
        dispatch: PropTypes.func,
        meta: PropTypes.object,
        user: PropTypes.object,
        contacts: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        chat: {},
        select: false,
        onClick: {},
        dispatch: {},
        meta: {},
        user: {},
        contacts: []
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { onClick, chat, select, user } = this.props;
        const chatName = getChatName(chat, user);
        return (
            <ChatWrapper onClick={onClick} select={select}>
                <div className="chat-avatar">
                    <img src={chat.avatar} width="50" height="50" alt={chatName} className="chat-avatar__img" />
                </div>
                <div className="chat-description">
                    <ChatHeader>{chatName}</ChatHeader>
                    {chat.lastMessage && chat.lastMessage.message && chat.lastMessage.sender &&
                    <LastMessage>
                        <Sender>{chat.lastMessage.sender.name}:</Sender>
                        <span>{chat.lastMessage.message}</span>
                    </LastMessage>
                    }
                </div>
            </ChatWrapper>
        );
    }
}

export default connect()(Chat);
