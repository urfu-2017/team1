import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatWindowWrapper from '../styles/chatWindow';

import Messages from '../components/messages';
import ChatWindowInput from './chatWindowInput';
import Background from './backgrond';

export default class ChatWindow extends Component {
    static propTypes = {
        title: PropTypes.string,
        messages: PropTypes.arrayOf(PropTypes.object),
        currentChatId: PropTypes.string,
        currentUserId: PropTypes.string,
<<<<<<< HEAD
        serverURL: PropTypes.string
=======
        serverURL: PropTypes.string,
        background: PropTypes.string,
        allChats: PropTypes.arrayOf(PropTypes.object)
>>>>>>> 78555161b5fd04efaae26a7eb738531e903f51ef
    };


    static defaultProps = { title: '', messages: [], currentChatId: '', currentUserId: '', serverURL: '', background: '', allChats: [] };

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { messages, title, currentChatId, currentUserId, serverURL, allChats } = this.props;

        return currentChatId ?
<<<<<<< HEAD
            <ChatWindowWrapper >
                <Background />
=======
            <ChatWindowWrapper>
>>>>>>> 78555161b5fd04efaae26a7eb738531e903f51ef
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
