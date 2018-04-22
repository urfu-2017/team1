import React from 'react';
import PropTypes from 'prop-types';
import { MessagesList, Header } from '../../styles/messages';

import Message from './message';
import ScrollButton from './scrollButton';


export default class Messages extends React.Component {
    static propTypes = {
        title: PropTypes.string,
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

    getSectionRef = node => (this.node = node);

    getMessagesList() {
        const { messages, currentUserId } = this.props;

        return messages.map(currentMessage => (
            <Message
                key={currentMessage.id}
                message={currentMessage.text}
                creationTime={currentMessage.createdAt}
                isFromSelf={currentMessage.senderId === currentUserId}
            />
        ));
    }

    render() {
        const { title } = this.props;
        return (
            <React.Fragment>
                <Header>
                    {title}
                </Header>
                <MessagesList id="messages" ref={this.getSectionRef}>
                    <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
                    {this.getMessagesList()}
                </MessagesList>
            </React.Fragment>
        );
    }
}
