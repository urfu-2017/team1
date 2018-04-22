import React from 'react';
import {graphql, compose} from 'react-apollo';
import PropTypes from 'prop-types';

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
    // pollInterval: 500  // TODO: remove poll and implement subscriptions
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

    get chat() {
        return this.props.chat && this.props.chat.Chat || null;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.localState.currentChatId && !nextProps.chat.loading) {
            console.log('CONT');
            if (this.unsubscribe) {
                if (this.props.stopSub !== nextProps.stopSub) {
                    console.log("UNSUBS");
                    this.unsubscribe();
                } else {
                    console.log('RETURNS');
                    return;
                }
            }
            console.log('SUBS');
            if (!this.chat) {
                return;
            }
            this.unsubscribe = nextProps.chat.subscribeToMore({
                document: SubscribeNewMessages.query,
                variables: SubscribeNewMessages.vars(this.chat.id),
                updateQuery: (previousResult, { subscriptionData, variables }) => {
                    if (!previousResult.Chat) {
                        return previousResult;
                    }
                    const messages = [...previousResult.Chat.messages]
                        .concat([subscriptionData.data.Message.node]);
                    const updatedResult = { Chat: { ...previousResult.Chat, messages } };
                    return updatedResult;
                }
            });
        }
    }

    render() {
        if (this.props.chat.loading) {
            return this.loadScreen;
        }
        if (this.props.chat.error) {
            return <p>Error ;(</p>;
        }

        const { currentUser } = this.props;
        return this.chat ?
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
            </ChatWindowWrapper> : <ChatWindowWrapper/>;
    }
}
