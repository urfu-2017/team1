import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MessagesList, Header, Button } from '../styles/messages';

import Message from './message';

class ScrollButton extends React.Component {
    constructor() {
        super();

        this.state = {
            intervalId: 0
        };
    }

    scrollStep() {
        const messagesBlock = document.getElementById('messages');
        const { scrollHeight } = messagesBlock;
        if (messagesBlock.pageYOffset !== scrollHeight) {
            clearInterval(this.state.intervalId);
        }
        messagesBlock.scroll(0.0, scrollHeight - this.props.scrollStepInPx);
    }

    scrollToBottom() {
        const intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
        this.setState({ intervalId });
    }

    render() {
        return (
            <Button
                type="button"
                title="Жмяк вниз"
                value="&#11167;"
                className="scroll"
                onClick={() => { this.scrollToBottom(); }}
            />
        );
    }
}

export default class Messages extends Component {
    static propTypes = {
        title: PropTypes.string,
        currentUserId: PropTypes.string,
        visibilityAddUser: PropTypes.func,
        messages: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        title: '',
        messages: [],
        currentUserId: '',
        visibilityAddUser: () => {}
    };

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

    getSectionRef = node => { this.node = node; }

    getMessagesList() {
        const { messages, currentUserId } = this.props;

        return messages.map((currentMessage, index) => (
            <Message
                key={index}
                message={currentMessage.content.text}
                creationTime={currentMessage.createAt}
                fromMe={currentMessage.senderId === currentUserId}
            />
        ));
    }

    render() {
        const { title, visibilityAddUser } = this.props;

        return (
            <React.Fragment>
                <Header
                    onClick={() => { visibilityAddUser(true); }}
                > {title}
                </Header>
                <MessagesList id="messages" ref={this.getSectionRef}>
                    <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
                    {this.getMessagesList()}
                </MessagesList>
            </React.Fragment>
        );
    }
}
