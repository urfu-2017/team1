import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatWindowWrapper from '../styles/chatWindow';

import Messages from '../components/messages';
import ChatWindowInput from './chatWindowInput';

export default class ChatWindow extends Component {
    static propTypes = {
        user: PropTypes.shape(),
        chat: PropTypes.shape()
    };

    static defaultProps = { chat: {}, user: {} };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { chat, user } = this.props;

        return chat._id ?
            <ChatWindowWrapper>
                <Messages
                    messages={chat.messages}
                    title={chat.name}
                    currentUserId={user._id}
                />
                <ChatWindowInput
                    chat={chat}
                    user={user}
                />
            </ChatWindowWrapper > : <ChatWindowWrapper />;
    }
}
