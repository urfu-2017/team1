import React from 'react';
import {graphql} from 'react-apollo';
import PropTypes from 'prop-types';

import LoadScreen from '../ui/loadScreen';
import ChatWindowWrapper from '../../styles/chatWindow';
import {Header} from '../../styles/messages';
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

    get chat() {
        return this.props.chat && this.props.chat.Chat || null;
    }

    static LoadScreen = <LoadScreen offsetPercentage={50}/>;

    static ErrorScreen = <p>Error ;(</p>;

    render() {
        const { currentUser } = this.props;
        let Content = null;
        if (!currentUser || !this.chat || this.props.chat.loading) {
            Content = Chat.LoadScreen;
        } else if (this.props.chat.error) {
            Content = Chat.ErrorScreen;
        } else {
            Content = (
                <React.Fragment>
                    <Header>
                        {this.chat.title}
                    </Header>
                    <Messages
                        messages={this.chat.messages}
                        currentUserId={currentUser.id}
                        id={this.chat.id}
                    />
                    <MessageInput
                        currentChatId={this.chat.id}
                        currentUserId={currentUser.id}
                    />
                </React.Fragment>
            );
            // TODO: separate general chat info and messages between components
            this.subscribe();
        }

        return (
            <ChatWindowWrapper>
                <Content />
            </ChatWindowWrapper>
        );
    }
}
