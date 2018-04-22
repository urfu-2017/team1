import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatWindowWrapper from '../styles/chatWindow';

import Messages from '../components/messages';
import ChatWindowInput from './chatWindowInput';

import { getChatName } from '../utils/chats';

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
                    title={getChatName(chat, user)}
                    user={user}
                    chat={chat}
                />
                <ChatWindowInput
                    chat={chat}
                    user={user}
                />
            </ChatWindowWrapper > : <ChatWindowWrapper />;
    }
}
