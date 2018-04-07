import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Messages from '../components/messages';
import ChatInput from './chatInput';


const ChatWrapper = styled.section`
    width: 65%;

    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: #f2f3ee;
    @media (max-width: 400px)
    {
        display: none;
    }
`;

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
        return messages.length ?
            <ChatWrapper >
                <Messages messages={messages} title={title} />
                <ChatInput />
            </ChatWrapper > : <ChatWrapper />;
    }
}
