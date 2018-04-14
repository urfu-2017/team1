import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import { ChatWrapper, ChatHeader, LastMessage, Sender } from '../styles/chat';

import { addMessageFromSocket, cursorIsPressedFromBelow, moveCursorDown } from '../actions/actions';

class Chat extends Component {
    static propTypes = {
        chat: PropTypes.object,
        select: PropTypes.bool,
        onClick: PropTypes.func,
        dispatch: PropTypes.func,
        currentUserId: PropTypes.string,
        meta: PropTypes.object,
        user: PropTypes.object,
        contacts: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        chat: {},
        select: false,
        onClick: {},
        dispatch: {},
        currentUserId: null,
        meta: {},
        user: {},
        contacts: []
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { serverURL, chatSocketPrefix } = this.props.meta;
        const chatId = this.props.chat.id;
        this.socket = io({
            transports: ['websocket']
        });
        this.socket.on(`${chatSocketPrefix}-${chatId}`, data => {
            const { contacts, user } = this.props;
            console.log('Got something');
            console.log(data);
            console.log(contacts);
            const { currentUserId } = this.props;
            let sender = contacts.find(x => x.id === data.message.senderId);
            if (!sender) {
                sender = user;
                console.log('сообщение от самого себя');
                console.log(sender);
            }
            console.log(sender);
            const cursorInBottom = cursorIsPressedFromBelow();
            this.props.dispatch(addMessageFromSocket(data.message, currentUserId, sender));
            if (cursorInBottom) {
                moveCursorDown();
            }
        });
    }

    componentWillUnmount() {
        this.socket.off('now');
        this.socket.close();
    }

    render() {
        const { onClick, chat, select } = this.props;
        const { currentUserId } = this.props;
        const names = chat.title.split('!_!_!');
        const chatName = currentUserId === chat.creatorId ? names[0] : names[1];
        return (
            <ChatWrapper onClick={onClick} select={select}>
                <ChatHeader>{chatName}</ChatHeader>
                {chat.lastMessage && chat.lastMessage.content && chat.lastMessage.sender &&
                <LastMessage>
                    <Sender>{chat.lastMessage.sender.name}:</Sender>
                    <span>{chat.lastMessage.content.text}</span>
                </LastMessage>
                }
            </ChatWrapper>
        );
    }
}

export default connect()(Chat);
