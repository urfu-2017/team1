import React from 'react';
import dynamic from 'next/dynamic';
import {graphql, compose} from 'react-apollo';
import PropTypes from 'prop-types';

const OverlayLoader = dynamic(import('react-loading-indicator-overlay/lib/OverlayLoader'), { ssr: false });

import ChatWindowWrapper from '../../styles/chatWindow';
import MessageInput from './messageInput';
import Messages from './messages';
import {GET_CURRENT_CHAT_ID_ql} from '../../graphqlQueries/localState';
import {GetChat} from '../../graphqlQueries/chats';
import {withCurrentUser} from '../../lib/currentUserContext';
import {SubscribeNewMessages} from '../../graphqlQueries/messages';


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
    // props: GetChat.map
})
export default class Chat extends React.Component {
    static propTypes = {
        currentUser: PropTypes.object
    };

    static defaultProps = {
        chat: {}
    };

    get chat() {
        return this.props.chat && this.props.chat.Chat || null;
    }

    subscriptions = {};

    static subscriptionDataHandler = (previousResult, { subscriptionData, variables }) => {
        if (!previousResult.Chat) {
            return previousResult;
        }
        const messages = [...previousResult.Chat.messages]
            .concat([subscriptionData.data.Message.node]);
        return { Chat: { ...previousResult.Chat, messages } };
    };

    subscribe = () => {
        if (!this.subscriptions[this.chat.id]) {
            this.subscriptions[this.chat.id] = this.props.chat.subscribeToMore({
                document: SubscribeNewMessages.query,
                variables: SubscribeNewMessages.vars(this.chat.id),
                updateQuery: Chat.subscriptionDataHandler
            });
        }
    };

    loadScreen = () => (
        (typeof window === 'undefined') ? null :
            <ChatWindowWrapper>
                <div style={{ height: '50%' }} />
                <OverlayLoader
                    displayName={'foo'}
                    color={'#7e9cda'}
                    loader="GridLoader"
                    active={true}
                    backgroundColor={'black'}
                    opacity="0"
                />
            </ChatWindowWrapper>
    );

    render() {
        if (this.props.chat.loading) {
            return this.loadScreen();
        }
        if (this.props.chat.error) {
            return <p>Error ;(</p>;
        }

        if (!this.chat) {
            return <ChatWindowWrapper/>;
        }

        this.subscribe();  // TODO: separate general chat info and messages between components
        const { currentUser } = this.props;
        if (!currentUser) return <div />;
        return (
            <ChatWindowWrapper>
                <Messages
                    messages={this.chat.messages}
                    title={this.chat.title}
                    currentUserId={currentUser.id}
                    id={this.chat.id}
                />
                <MessageInput
                    currentChatId={this.chat.id}
                    currentUserId={currentUser.id}
                />
            </ChatWindowWrapper>
        );
    }
}
