import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import ChatWindowWrapper from '../styles/chatWindow';
import { OPENED_CHAT_ql } from '../graphqlQueries/openedChat';
import { CURRENT_USER_ql } from '../graphqlQueries/currentUser';


// TODO: make centralized state provider and get rid of duplicating queries
@compose(
    graphql(OPENED_CHAT_ql, { name: 'openedChat' }),
    graphql(CURRENT_USER_ql, { name: 'currentUser' })
)
export default class ChatWindow extends Component {
    loadScreen = (
        <div>Loading...</div>
    );

    stillLoading = () => this.props.currentUser.loading || this.props.openedChat.loading;

    render() {
        if (this.props.openedChat.loading) return this.loadScreen;

        // TODO: props names selection seems to be pretty awful
        const {
            messages,
            title,
            chatId,
            allChats
        } = this.props.openedChat.openedChat;

        // const { userId, name } = this.props.currentUser;

        return chatId ?
            <ChatWindowWrapper>
                {/*<Messages*/}
                    {/*messages={messages}*/}
                    {/*title={title}*/}
                    {/*currentUserId={userId}*/}
                {/*/>*/}
                {/*<ChatWindowInput*/}
                    {/*currentChatId={chatId}*/}
                    {/*currentUserId={userId}*/}
                    {/*allChats={allChats}*/}
                {/*/>*/}
            </ChatWindowWrapper > : <ChatWindowWrapper />;
    }
}
