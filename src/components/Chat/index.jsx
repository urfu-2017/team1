import React from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';

import ChatWindowWrapper from '../../styles/chatWindow';
import MessageInput from './messageInput';
import Messages from './messages';
import { OPENED_CHAT_ql } from '../../graphqlQueries/openedChat';
import { CURRENT_USER_ql } from '../../graphqlQueries/currentUser';


// TODO: make centralized state provider and get rid of duplicating queries
@compose(
    graphql(OPENED_CHAT_ql, { name: 'openedChat' }),
    graphql(CURRENT_USER_ql, { name: 'currentUser' })
)
export default class ChatWindow extends React.Component {
    propTypes = {
        currentUser: PropTypes.object
    };

    loadScreen = (
        <div>Loading...</div>
    );

    stillLoading = () => this.props.currentUser.loading || this.props.openedChat.loading;

    render() {
        if (this.props.openedChat.loading) return this.loadScreen;

        // TODO: props names selection seems to be pretty awful
        const openedChat = this.props.openedChat;

        const currentUser = this.props.currentUser;

        return openedChat.id ?
            <ChatWindowWrapper>
                <Messages
                    messages={openedChat.messages}
                    title={openedChat.title}
                    currentUserId={currentUser.id}
                />
                <MessageInput
                    currentChatId={openedChat.id}
                    currentUserId={currentUser.id}
                    allChats={openedChat.allChats}
                />
            </ChatWindowWrapper > : <ChatWindowWrapper />;
    }
}
