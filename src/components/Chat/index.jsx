import React from 'react';
import {graphql, compose} from 'react-apollo';
import PropTypes from 'prop-types';

import ChatWindowWrapper from '../../styles/chatWindow';
import {Header} from '../../styles/messages';
import Messages from './messages';
import {GET_CURRENT_CHAT_ID_ql} from '../../graphqlQueries/localState';
import {GetChatInfo} from '../../graphqlQueries/queries';
import {withCurrentUser} from '../../lib/currentUserContext';


const currentChatSet = ({ currentChatId }) =>
    currentChatId && typeof currentChatId === 'string';


// Не в compose, потому что тогда в localState не будет значения
@withCurrentUser
@graphql(GET_CURRENT_CHAT_ID_ql, { name: 'localState' })
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

    render() {
        const { localState, loading, error, chat, currentUser } = this.props;
        // const {id, title, picture, createdAt, members} = chat;
        let content = null;
        if (!currentUser || !currentChatSet(localState)) {
            content = null;
        } else if (error) {
            content = Chat.ErrorScreen;
        } else {
            content = (
                <React.Fragment>
                    <Header>
                        {chat.title || 'Загрузка...'}
                    </Header>
                    <Messages
                        currentChatId={chat.id || null}
                        currentUserId={currentUser.id}/>
                </React.Fragment>
            );
        }

        return (
            <ChatWindowWrapper>
                {content}
            </ChatWindowWrapper>
        );
    }

    static ErrorScreen = <p>Error ;(</p>;
}
