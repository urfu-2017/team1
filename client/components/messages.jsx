import React from 'react';
import PropTypes from 'prop-types';
import { MessagesList, Header } from '../styles/messages';

import Message from './message';

export default class Messages extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        messages: PropTypes.arrayOf(PropTypes.object)
    }

    static defaultProps = { title: '', messages: [] }

    componentDidUpdate = () => { this.node.scrollTop = this.node.scrollHeight; }

    getSectionRef = node => { this.node = node; }

    getMessagesList() {
        const { messages } = this.props;
        return messages.map((currentMessage, index) => (
            <Message
                key={index}
                message={currentMessage.content.text}
                creationTime={currentMessage.createAt}
                from={currentMessage.content.from}
            />
        ));
    }

    render() {
        const { title } = this.props;
        return (
            <React.Fragment>
                <Header> {title} </Header>
                <MessagesList ref={this.getSectionRef}> {this.getMessagesList()} </MessagesList>
            </React.Fragment>
        );
    }
}