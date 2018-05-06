import React from 'react';
import {graphql} from 'react-apollo';
import PropTypes from 'prop-types';

import ChatWindowWrapper from '../../styles/chatWindow';
import Header from './header';
import Messages from './messages';
import {GetChatInfo, GetChatMessages} from '../../graphqlQueries/queries';
import {withCurrentUser} from '../../lib/currentUserContext';
import ChatEditor from './chatEditor';
import {withLocalState} from '../../lib/withLocalState';
import {processChat, userSubscriptionDataHandler} from '../../lib/dataHandlers';
import {SubscribeToUsersInChat} from '../../graphqlQueries/subscriptions';


const currentChatSet = ({ currentChatId }) =>
    currentChatId && typeof currentChatId === 'string';


// Не в compose, потому что тогда в localState не будет значения
@withCurrentUser
@withLocalState
@graphql(
    GetChatInfo.query, {
        // не запрашиваем, если не открыт никакой чат, или localState ещё не успел выполниться
        // чёрт знает, почему не работает .loading
        skip: ({ localState }) => !currentChatSet(localState),
        options: ({ localState: { currentChatId } }) => ({
            variables: { chatId: currentChatId }
        }),
        props: GetChatInfo.map
    })
export default class Chat extends React.Component {
    static propTypes = {
        currentUser: PropTypes.object,
        serverUrl: PropTypes.string,
        localState: PropTypes.object,
        loading: PropTypes.bool,
        error: PropTypes.object,
        chat: PropTypes.object
    };

    static defaultProps = {
        currentUser: {},
        localState: {},
        loading: true,
        error: null,
        chat: {}
    };

    constructor(props) {
        super(props);
        this.state = { editorOpened: false };
    }

    componentWillReceiveProps(props) {
        const { editorOpened, localState } = props;
        if (this.props.editorOpened !== editorOpened ||
            localState.currentChatId !== this.props.localState.currentChatId)
            this.setState({ editorOpened });
    }

    getMainComponent(chat, currentUser) {
        if (this.state.editorOpened) {
            return (
                <ChatEditor
                    currentChat={chat}
                    serverUrl={this.props.serverUrl}
                    currentUser={currentUser}
                    toggleEditor={this.toggleEditor}/>
            );
        }

        // Nothing to see here...
        const MessagesWithData = graphql(
            GetChatMessages.query(chat.id),
            {
                name: 'data',
                skip: ({ currentChatId }) => !currentChatId,
                props: GetChatMessages.map
            }
        )(Messages);
        return (
            <MessagesWithData
                currentChatId={chat.id || null}
                currentUserId={currentUser.id}/>
        );

    }

    toggleEditor = () => this.setState(prev => ({ editorOpened: !prev.editorOpened }));

    render() {
        let { localState, loading, error, chat, currentUser } = this.props;
        // const {id, title, picture, createdAt, members, groupchat} = chat;
        let content = null;
        if (!currentUser || !currentChatSet(localState)) {
            content = null;
        } else if (error) {
            content = this.ErrorScreen;
        } else if (loading || !chat) {
            content = (
                <React.Fragment>
                    <Header loading={true}/>
                    {this.getMainComponent(chat, currentUser)}
                </React.Fragment>
            );
        } else {
            this.subscribe();
            chat = processChat(currentUser.id, chat);
            content = (
                <React.Fragment>
                    <Header chat={chat}
                            loading={false}
                            toggleEditor={this.toggleEditor}
                            editorOpened={this.state.editorOpened}/>
                    {this.getMainComponent(chat, currentUser)}
                </React.Fragment>
            );
        }

        return (
            <ChatWindowWrapper>
                {content}
            </ChatWindowWrapper>
        );
    }

    chatUsersSubscription = null;

    subscribe = () => {
        if (!this.chatUsersSubscription) {
            this.chatUsersSubscription = this.props.data.subscribeToMore({
                document: SubscribeToUsersInChat.subscription,
                variables: SubscribeToUsersInChat.vars(this.props.chat.id),
                updateQuery: userSubscriptionDataHandler
            });
        }
    };
}
