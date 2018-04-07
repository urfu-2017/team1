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
    border: 1px solid #111;

    @media (max-width: 800px)
    {
        display: none;
    }
`;

export default class Chat extends React.Component {
    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.object)
    }

    static defaultProps = { messages: [] };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { messages } = this.props;
        return messages.length ?
            <ChatWrapper >
                <Messages messages={messages} />
                <ChatInput />
            </ChatWrapper > : <ChatWrapper />;
    }
}
