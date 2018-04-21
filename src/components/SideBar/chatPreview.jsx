import React from 'react';
import PropTypes from 'prop-types';

import { ChatWrapper, ChatHeader, LastMessage, Sender } from '../../styles/chat';


class ChatPreview extends React.Component {
    static propTypes = {
        selectChat: PropTypes.func,
        chat: PropTypes.object,
        select: PropTypes.bool,
        dispatch: PropTypes.func,
        currentUserId: PropTypes.string,
        meta: PropTypes.object,
        user: PropTypes.object,
    };

    static defaultProps = {
        chat: {},
        select: false,
        onClick: {},
        dispatch: {},
        currentUserId: null,
        meta: {},
        user: {},
    };

    constructor(props) {
        super(props);

        this.state = {
            isSelected: false
        }
    }

    // Не создаём новую функцию при каждом рендере
    selectThisChat = () => {
        this.props.selectChat(this.props.chat.id);
        this.setState({ isSelected: true });
    };

    render() {
        const { select, lastMessage, chat } = this.props;
        return (
            <ChatWrapper onClick={this.selectThisChat} select={select}>
                <div className='chat-avatar'>
                    <img src={chat.picture} width='50' height='50'
                         className='chat-avatar__img'/>
                </div>
                <div className='chat-description'>
                    <ChatHeader>{chat.name}</ChatHeader>
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
