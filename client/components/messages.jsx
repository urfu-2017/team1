import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MessagesList, Header } from '../styles/messages';

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
        const scrollHeight = messagesBlock.scrollHeight
        if (messagesBlock.pageYOffset !== scrollHeight) {
            console.info('window.pageYOffset', window.pageYOffset);
            console.info('scrollHeight', scrollHeight);
            clearInterval(this.state.intervalId);
        }
        messagesBlock.scroll(0.0, scrollHeight - this.props.scrollStepInPx);
    }

    scrollToBottom() {
        let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
        this.setState({ intervalId });
    }

    render() {
        const buttonStyle = {
            backgroundColor: 'white',
            position: 'absolute',
            padding: '0',
            marginRight: '128px',
            marginBottom: '10px',
            bottom: '50px',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            borderColor: '#b7c5f5',
            color: '#b7c5f5',
            right: '30px',
            cursor: 'pointer'
        };
        return (
            <input
                type="button"
                style={buttonStyle}
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
        messages: PropTypes.arrayOf(PropTypes.object),
        currentUserId: PropTypes.string
    };

    static defaultProps = { title: '', messages: [], currentUserId: '' };

    componentDidMount() {
        this.node.scrollTop = this.node.scrollHeight;
    }

    componentWillUpdate = function () {
        this.shouldScrollBottom = this.node.scrollTop +
            this.node.offsetHeight === this.node.scrollHeight;
    };

    componentDidUpdate = function () {
        if (this.shouldScrollBottom) {
            this.node.scrollTop = this.node.scrollHeight;
        }
    };

    getSectionRef = node => { this.node = node; }

    getMessagesList() {
        const { messages, currentUserId } = this.props;

        return messages.map((currentMessage, index) => (
            <Message
                key={index}
                message={currentMessage.content.text}
                creationTime={currentMessage.createAt}
                fromMe={currentMessage.senderId === currentUserId}
                metadata={currentMessage.metadata}
            />
        ));
    }

    render() {
        const { title } = this.props;
        return (
            <React.Fragment>
                <Header> {title} </Header>
                <MessagesList id="messages" ref={this.getSectionRef}>
                    <ScrollButton scrollStepInPx="50" delayInMs="16.66"/>
                    {this.getMessagesList()}
                </MessagesList>
            </React.Fragment>
        );
    }
}
