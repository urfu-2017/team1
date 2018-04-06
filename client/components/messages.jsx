import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Message from './message';

const MessagesList = styled.section`
        width: 100%;
        overflow-y: auto;
    
        display: flex;
        flex: 1;
        flex-direction: column;
`;

export default class Messages extends React.Component {
    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.object)
    }

    static defaultProps = { messages: [] }

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
        return (
            <React.Fragment>
                <MessagesList ref={this.getSectionRef}> {this.getMessagesList()} </MessagesList>
            </React.Fragment>
        );
    }
}
