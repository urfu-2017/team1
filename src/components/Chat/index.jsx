import React from 'react';
import {graphql} from 'react-apollo';
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
        id: PropTypes.string,
        title: PropTypes.string,
        picture: PropTypes.string,
        createdAt: PropTypes.number,
        loading: PropTypes.bool,
        error: PropTypes.bool,
    };

    static defaultProps = {
        currentUser: {},
        localState: {},
        id: '',
        title: '',
        picture: '',
        createdAt: NaN,
        loading: true,
        error: false,
    };

    render() {
        const { localState, loading, error, id, title,
            picture, createdAt, currentUser } = this.props;
        let content = null;
        if (!currentUser || !currentChatSet(localState)) {
            content = null;
        } else if (error) {
            content = Chat.ErrorScreen;
        } else {
            content = (
                <React.Fragment>
                    <Header>
                        {title || 'Загрузка...'}
                    </Header>
                    <Messages
                        currentChatId={id || null}
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
