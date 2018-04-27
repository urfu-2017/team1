import React, { Component } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { MessagesList, Header, Button } from '../styles/messages';

import Message from './message';

class ScrollButton extends React.Component {
    constructor() {
        super();

        this.state = {
            intervalId: 0
        };
    }

    scrollStep() {
        const messagesBlock = document.getElementById('messages');
        const { scrollHeight } = messagesBlock;
        if (messagesBlock.pageYOffset !== scrollHeight) {
            clearInterval(this.state.intervalId);
        }
        messagesBlock.scroll(0.0, scrollHeight - this.props.scrollStepInPx);
    }

    scrollToBottom() {
        let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
        this.setState({ intervalId });
    }

    render() {
        return (
            <Button
                type="button"
                title="Жмяк вниз"
                value="&#11167;"
                className="scroll"
                onClick={() => { this.scrollToBottom(); }}
            />
        );
    }
}

export default class Messages extends Component {
    static propTypes = {
        title: PropTypes.string,
        chat: PropTypes.shape(),
        user: PropTypes.shape(),
        onReceiveMessage: PropTypes.func,
        socketURL: PropTypes.string
    };

    static defaultProps = { title: '', chat: {}, user: {} };

    componentDidMount() {
        const { socketURL, chat, onReceiveMessage, user } = this.props;

        this.node.scrollTop = this.node.scrollHeight;

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
        this.shouldScrollBottom = this.node.scrollTop +
            this.node.offsetHeight === this.node.scrollHeight;
    }

    componentDidUpdate() {
        if (this.shouldScrollBottom) {
            this.node.scrollTop = this.node.scrollHeight;
        }
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    getSectionRef = node => { this.node = node; }

    getMessagesList() {
        const { chat, user } = this.props;

        return chat.messages.map(message => (
            <Message
                key={message._id}
                message={message.message}
                creationTime={message.createdAt}
                fromMe={message.sender.userId === user._id}
                isSuccess={message.isSuccess == null ? true : message.isSuccess}
                isSended={message.isSended}
                metadata={message.metadata}
                sender={message.sender}
            />
        ));
    }

    render() {
        const { title } = this.props;
        return (
            <React.Fragment>
                <Header>{title}</Header>
                <MessagesList id="messages" ref={this.getSectionRef}>
                    <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
                    {this.getMessagesList()}
                </MessagesList>
            </React.Fragment>
        );
    }
}
