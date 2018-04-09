import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatWindowWrapper from '../styles/chatWindow';

import Messages from '../components/messages';
import ChatWindowInput from './chatWindowInput';

export default class ChatWindow extends Component {
    static propTypes = {
        title: PropTypes.string,
        messages: PropTypes.arrayOf(PropTypes.object),
        currentChatId: PropTypes.string,
        currentUserId: PropTypes.string
    }

    static defaultProps = { title: '', messages: [], currentChatId: '', currentUserId: '' };

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { messages, title, currentChatId, currentUserId } = this.props;

        return messages.length ?
            <ChatWindowWrapper >
                <Messages
                    messages={messages}
                    title={title}
                />
                <ChatWindowInput
                    currentChatId={currentChatId}
                    currentUserId={currentUserId}
                />
            </ChatWindowWrapper > : <ChatWindowWrapper />;
    }
}
