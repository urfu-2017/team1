import React from 'react';
import {graphql} from 'react-apollo';
import PropTypes from 'prop-types';

import ChatWindowWrapper from '../../styles/chatWindow';
import {Header} from '../../styles/messages';
import Messages from './messages';
import {GetChatInfo} from '../../graphqlQueries/queries';
import {withCurrentUser} from '../../lib/currentUserContext';
import ChatEditor from './chatEditor';
import withLocalState from '../../lib/withLocalState';
import {processChat} from '../../lib/dataHandlers';


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
        const { editorOpened } = props;
        this.setState({ editorOpened });
    }

    getMainComponent(currentChat, currentUser) {
        return this.state.editorOpened ?
            <ChatEditor
                currentChat={currentChat}
                currentUser={currentUser}
                toggleEditor={this.toggleEditor}/> :
            <Messages
                currentChatId={currentChat.id || null}
                currentUserId={currentUser.id}/>;
    }

    toggleEditor = () => this.setState(prev => ({ editorOpened: !prev.editorOpened }));

    groupChatHeader = title => (
        <span onClick={this.toggleEditor}>
            {'✎\t' + title}
        </span>
    );

    personalChatHeader = title => {
        return (
            <span>
                {title}
            </span>
        );
    };

    render() {
        let { localState, loading, error, chat, currentUser } = this.props;
        console.log(this.props);
        // const {id, title, picture, createdAt, members} = chat;
        let content = null;
        if (!currentUser || !currentChatSet(localState)) {
            content = null;
        } else if (error) {
            content = this.ErrorScreen;
        } else if (loading) {
            content = (
                <React.Fragment>
                    <Header>
                        <span>Загрузка...</span>
                    </Header>
                    {this.getMainComponent(chat, currentUser)}
                </React.Fragment>
            );
        } else {
            chat = processChat(currentUser.id, chat);
            const groupchat = chat.groupchat || false;
            content = (
                <React.Fragment>
                    <Header>
                        {groupchat && this.groupChatHeader(chat.title) ||
                        this.personalChatHeader(chat.title)}
                    </Header>
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
}
