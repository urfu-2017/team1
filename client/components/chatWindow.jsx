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
        allChats: PropTypes.arrayOf(PropTypes.object)
    };


    static defaultProps = {
        title: '',
        messages: [],
        currentChatId: '',
        currentUserId: '',
        serverURL: '',
        allChats: []
    };

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {
            messages,
            title,
            currentChatId,
            currentUserId,
            serverURL,
            allChats
        } = this.props;

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
                    allChats={allChats}
                />
            </ChatWindowWrapper > : <ChatWindowWrapper />;
    }
}