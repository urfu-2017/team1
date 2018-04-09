import React from 'react';
import PropTypes from 'prop-types';
import ChatWrapper from '../styles/chat';

import Messages from '../components/messages';
import ChatInput from './chatInput';

export default class Chat extends React.Component {
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
            <ChatWrapper >
                <Messages
                    messages={messages}
                    title={title}
                />
                <ChatInput
                    currentChatId={currentChatId}
                    currentUserId={currentUserId}
                />
            </ChatWrapper > : <ChatWrapper />;
    }
}
