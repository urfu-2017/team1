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
        currentUserId: PropTypes.string,
        serverURL: PropTypes.string,
        background: PropTypes.string,
        chats: PropTypes.arrayOf(PropTypes.object)
    };


    static defaultProps = { title: '', messages: [], currentChatId: '', currentUserId: '', serverURL: '', background: '', chats: [] };

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { messages, title, currentChatId, currentUserId, serverURL, chats } = this.props;

        return currentChatId ?
            <ChatWindowWrapper>
                <Messages
                    messages={messages}
                    title={title.replace('!_!_!', ' and ')}
                    currentUserId={currentUserId}
                />
                <ChatWindowInput
                    currentChatId={currentChatId}
                    currentUserId={currentUserId}
                    serverURL={serverURL}
                    chats={chats}
                />
            </ChatWindowWrapper > : <ChatWindowWrapper />;
    }
}
