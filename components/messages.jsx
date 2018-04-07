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

const Header = styled.section`
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 10px 0;
    background-color: rgba(255,255,255, .7);
`;

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
