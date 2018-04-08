import React from 'react';
import PropTypes from 'prop-types';
import ChatWrapper from '../styles/chat';

import Messages from '../components/messages';
import ChatInput from './chatInput';

export default class Chat extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        messages: PropTypes.arrayOf(PropTypes.object)
    }

    static defaultProps = { title: '', messages: [] };

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { messages, title } = this.props;
        console.log(messages.length);
        return messages.length ?
            <ChatWrapper >
                <Messages messages={messages} title={title} />
                <ChatInput />
            </ChatWrapper > : <ChatWrapper />;
    }
}
