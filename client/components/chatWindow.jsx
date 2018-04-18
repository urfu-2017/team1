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
        currentUserId: PropTypes.string
    };


    static defaultProps = { 
        title: '',
        messages: [],
        currentChatId: '',
        currentUserId: '',
    };

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { 
            title,
            messages,
            currentChatId,
            currentUserId,
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
                />
            </ChatWindowWrapper > : <ChatWindowWrapper />;
    }
}
