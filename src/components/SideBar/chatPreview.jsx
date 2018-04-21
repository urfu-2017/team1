import React from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';

import {ChatWrapper, ChatHeader, LastMessage, Sender} from '../../styles/chat';
import {GET_CURRENT_CHAT_ID_ql, UpdateCurrentChatId} from '../../graphqlQueries/localState';


@compose(
    graphql(GET_CURRENT_CHAT_ID_ql, { name: 'localState' }),
    graphql(UpdateCurrentChatId.query, {
        props: UpdateCurrentChatId.map
    })
)
export default class ChatPreview extends React.PureComponent {
    static propTypes = {
        chat: PropTypes.object,
        updateCurrentChatId: PropTypes.func  // присваивается вторым вызовом `graphql()`
    };

    static defaultProps = {
        chat: {}
    };

    // Не создаём новую функцию при каждом рендере
    selectThisChat = () => {
        this.props.updateCurrentChatId(this.props.chat.id);
        this.props.mainComponentChanger();
    };

    isSelected = () => this.props.chat.id === this.props.localState.currentChatId;

    render() {
        const { lastMessage, chat } = this.props;
        return (
            <ChatWrapper onClick={this.selectThisChat} select={this.isSelected()}>
                <div className='chat-avatar'>
                    <img src={chat.picture} width='50' height='50'
                         className='chat-avatar__img'/>
                </div>
                <div className='chat-description'>
                    <ChatHeader>{chat.name}</ChatHeader>
                    {/* TODO: lastMessage */}
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
