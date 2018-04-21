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
        visibilityAddUser: PropTypes.func,
        allChats: PropTypes.arrayOf(PropTypes.object)
    };


    static defaultProps = {
        title: '',
        allChats: [],
        messages: [],
        serverURL: '',
        currentChatId: '',
        currentUserId: '',
        visibilityAddUser: () => {}
    };

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {
            messages,
            title,
            visibilityAddUser,
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
                    visibilityAddUser={visibilityAddUser}
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
