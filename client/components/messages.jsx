import React, { Component } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { MessagesList, Header, Button } from '../styles/messages';

import Message from './message';

export default class Messages extends Component {
    static propTypes = {
        title: PropTypes.string,
        chat: PropTypes.shape(),
        user: PropTypes.shape(),
        onReceiveMessage: PropTypes.func,
        setReactionToMessage: PropTypes.func,
        socketURL: PropTypes.string
    };

    static defaultProps = { title: '', chat: {}, user: {} };

    componentDidMount() {
        const { socketURL, chat, onReceiveMessage, user } = this.props;

        this.socket = io(socketURL, {
            transports: ['websocket']
        });

        const roomName = chat._id;

        this.socket.on('connect', () => {
            this.socket.emit('room', roomName);
        });

        this.socket.on('message', data => {
            const { message } = data;

            if (message.sender.userId !== user._id) {
                onReceiveMessage(chat, message);
            }
        });

        this.socket.connect();
    }

    componentWillUpdate() {
        this.scroll.scrollToBottom();
    }

    componentDidUpdate() {
        this.scroll.scrollToBottom();
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    getSectionRef = node => { this.scroll = node; }

    getMessagesList() {
        const { chat, user, setReactionToMessage } = this.props;

        return chat.messages.map(message => (
            <Message
                key={message._id}
                userId={user._id}
                messageId={message._id}
                chat={chat}
                message={message.message}
                creationTime={message.createdAt}
                fromMe={message.sender.userId === user._id}
                isSuccess={message.isSuccess == null ? true : message.isSuccess}
                isSended={message.isSended}
                metadata={message.metadata}
                sender={message.sender}
                reactions={message.reactions}
                setReactionToMessage={setReactionToMessage}
            />
        ));
    }

    render() {
        const { title } = this.props;

        return (
            <React.Fragment>
                <Header>{title}</Header>
                <Scrollbars
                    style={{ 'background-color': 'rgba(255,255,255, .7)' }}
                    ref={this.getSectionRef}
                >
                    <Button
                        type="button"
                        title="Жмяк вниз"
                        value="&#11167;"
                        className="scroll"
                        onClick={() => this.scroll.scrollToBottom()}
                    />
                    <MessagesList >
                        {this.getMessagesList()}
                    </MessagesList>
                </Scrollbars>
            </React.Fragment>
        );
    }
}
