import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from 'react-icons/lib/fa/list';
import {Scrollbars} from 'react-custom-scrollbars';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {withCurrentUser} from '../../lib/currentUserContext';
import {withCurrentChatId} from '../../lib/currentChatContext';
import ChatPreview from './chatPreview';
import Paranja from './paranja';
import {Header, SearchInput, ChatsList} from '../../styles/chats';


// TODO: retrieve last messages and sort by modification order
const GET_CURRENT_USER_CHATS_ql = gql`
query GetUserChats($userId: ID!) {
  getUser(id: $userId) {
    id
    chats {
      edges {
        node {
          id
          name
        }
      }
    }
  }
}
`;

// Первым декоратором получаем объект текущего пользователя, который нам дал сервер
// Вторым - с помощью этого объекта просим у api все чаты текущего пользователя
// TODO: prop alias
@withCurrentUser
@graphql(GET_CURRENT_USER_CHATS_ql,
    {
        options: props => ({
            variables: {
                userId: props.currentUser.id
            }
        }),
        name: 'chats'  // Теперь результат находится в this.props.chats
    })
@withCurrentChatId
export default class SideBar extends React.Component {
    static propTypes = {
        currentUser: PropTypes.object,
        meta: PropTypes.shape(),
        mainComponentChanger: PropTypes.func,
        selectedChatId: PropTypes.string
    };

    static defaultProps = {
        meta: {}
    };

    constructor(props) {
        super(props);

        this.state = {
            paranjaOpened: false
        };
    }

    getChatsList() {
        const { currentUser, meta, selectedChatId, selectChat } = this.props;
        // TODO: prop alias
        return this.props.chats.getUser.chats.edges
            .map(edge => edge.node)
            .map(chat => (
                <ChatPreview
                    key={chat.id}
                    chat={chat}
                    select={selectedChatId === chat.id}
                    currentUserId={currentUser.id /* TODO: redundant */}
                    meta={meta}
                    user={currentUser}
                    selectChat={selectChat}
                />
            ));
    }

    toggleParanja = () =>
        this.setState((prev) => ({ paranjaOpened: !prev.paranjaOpened }));

    render() {
        const { chats, currentUser } = this.props;
        return (
            <React.Fragment>
                {
                    this.state.paranjaOpened &&
                    <Paranja
                        currentUser={currentUser}
                        toggleParanja={this.toggleParanja}
                        mainComponentChanger={this.props.mainComponentChanger}
                    />
                }
                <ChatsList>
                    <Header>
                        <div className="header__menu-icon">
                            <MenuIcon onClick={this.toggleParanja}/>
                        </div>
                        <SearchInput placeholder="Поиск" type="search"/>
                    </Header>
                    <Scrollbars universal>
                        {!chats.loading && !chats.error && this.getChatsList()}
                    </Scrollbars>
                </ChatsList>
            </React.Fragment>
        );
    }
}
