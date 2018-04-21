import React from 'react';
import PropTypes from 'prop-types';

import { ChatWrapper, ChatHeader, LastMessage, Sender } from '../../styles/chat';


class ChatPreview extends React.Component {
    static propTypes = {
        chat: PropTypes.object,
        select: PropTypes.bool,
        onClick: PropTypes.func,
        dispatch: PropTypes.func,
        currentUserId: PropTypes.string,
        meta: PropTypes.object,
        user: PropTypes.object,
        contacts: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        chat: {},
        select: false,
        onClick: {},
        dispatch: {},
        currentUserId: null,
        meta: {},
        user: {},
        contacts: []
    };

    render() {
        const { onClick, select, picture, title, lastMessage } = this.props;
        return (
            <ChatWrapper onClick={onClick} select={select}>
                <div className='chat-avatar'>
                    <img src={picture} width='50' height='50'
                         className='chat-avatar__img'/>
                </div>
                <div className='chat-description'>
                    <ChatHeader>{title}</ChatHeader>
                    {lastMessage && lastMessage.content && lastMessage.sender &&
                    <LastMessage>
                        <Sender>{lastMessage.sender.name}:</Sender>
                        <span>{lastMessage.content.text}</span>
                    </LastMessage>
                    }
                </div>
            </ChatWrapper>
        );
    }
}

export default ChatPreview;
