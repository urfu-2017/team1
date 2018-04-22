import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatWindowWrapper from '../styles/chatWindow';

import Messages from '../components/messages';
import ChatWindowInput from '../containers/chatInput';

export default class ChatWindow extends Component {
    static propTypes = {
        title: PropTypes.string,
        messages: PropTypes.arrayOf(PropTypes.object),
        currentChatId: PropTypes.string,
        currentUserId: PropTypes.string,
        visibilityAddUser: PropTypes.func
    };


    static defaultProps = {
        title: '',
        messages: [],
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
            currentUserId
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
                />
            </ChatWindowWrapper > : <ChatWindowWrapper />;
    }
}
