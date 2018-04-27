import React from 'react';
import PropTypes from 'prop-types';
import {MessagesList} from '../../styles/messages';

import Message from './message';
import ScrollButton from './scrollButton';


export default class Messages extends React.Component {
    static propTypes = {
        chatTitle: PropTypes.string,
        messages: PropTypes.arrayOf(PropTypes.object),
        currentUserId: PropTypes.string
    };

    static defaultProps = { title: '', messages: [], currentUserId: '' };

    componentDidMount() {
        this.node.scrollTop = this.node.scrollHeight;
    }

    componentWillUpdate() {
        this.shouldScrollBottom = this.node.scrollTop +
            this.node.offsetHeight === this.node.scrollHeight;
    }

    componentDidUpdate() {
        if (this.shouldScrollBottom) {
            this.node.scrollTop = this.node.scrollHeight;
        }
    }

    // Не создаём новую функцию при каждом рендере
    getSectionRef = node => (this.node = node);

    Message = message => (
        <Message
            key={message.id}
            message={message}
            isFromSelf={message.sender.id === this.props.currentUserId}
        />
    );

    render() {
        const { messages } = this.props;

        return (
            <MessagesList id="messages" ref={this.getSectionRef}>
                <ScrollButton scrollStepInPx="50" delayInMs="16.66"/>
                {messages.map(this.Message)}
            </MessagesList>
        );
    }
}
