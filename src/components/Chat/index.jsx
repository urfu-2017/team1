import React from 'react';
import {graphql, compose} from 'react-apollo';
import PropTypes from 'prop-types';

import ChatWindowWrapper from '../../styles/chatWindow';
import MessageInput from './messageInput';
import Messages from './messages';
import {GET_CURRENT_CHAT_ID_ql} from '../../graphqlQueries/localState';
import {GetChat} from '../../graphqlQueries/chats';
import {withCurrentUser} from '../../lib/currentUserContext';


// Не в compose, потому что тогда в localState не будет значения
@withCurrentUser
@graphql(GET_CURRENT_CHAT_ID_ql, { name: 'localState' })
@graphql(GetChat.query, {
    name: 'chat',
    // не запрашиваем, если не открыт никакой чат, или localState ещё не успел выполниться
    // чёрт знает, почему не работает .loading
    skip: props => !props.localState.currentChatId || typeof props.localState.currentChatId !== 'string',
    options: props => ({
        variables: {
            chatId: props.localState.currentChatId
        }
    }),
    pollInterval: 500  // TODO: remove poll and implement subscriptions
    // props: GetChat.map
})
export default class Chat extends React.Component {
    propTypes = {
        currentUser: PropTypes.object
    };

    static defaultProps = {
        chat: {}
    };

    loadScreen = (
        <div>Loading...</div>
    );

    render() {
        if (this.props.chat.loading) {
            return this.loadScreen;
        }
        if (this.props.chat.error) {
            return <p>Error ;(</p>;
        }

        const chat = this.props.chat && this.props.chat.Chat || null;
        const { currentUser } = this.props;
        return chat ?
            <ChatWindowWrapper>
                <Messages
                    messages={chat.messages}
                    title={chat.title}
                    currentUserId={currentUser.id}
                    id={chat.id}
                />
                <MessageInput
                    currentChatId={chat.id}
                    currentUserId={currentUser.id}
                />
            </ChatWindowWrapper> : <ChatWindowWrapper/>;
    }
}
