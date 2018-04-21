import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from 'react-icons/lib/fa/list';
import { Scrollbars } from 'react-custom-scrollbars';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ChatPreview from './chatPreview';
import Paranja from './paranja';
import { Header, SearchInput, ChatsList } from '../../styles/chats';


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


@graphql(GET_CURRENT_USER_CHATS_ql,
    {
        options: props => ({
            variables: {
                userId: 'VXNlcjox'
            }
        }),
        name: 'chats'
    })
export default class SideBar extends React.Component {
    static propTypes = {
        currentUser: PropTypes.object,
        selectedChatId: PropTypes.string,
        allChats: PropTypes.arrayOf(PropTypes.object),
        onClickChat: PropTypes.func,
        contacts: PropTypes.arrayOf(PropTypes.object),
        user: PropTypes.shape(),
        meta: PropTypes.shape(),
        mainComponentChanger: PropTypes.func
    };

    static defaultProps = {
        user: {},
        meta: {},
        allChats: [],
        onClickChat: () => {
        },
        selectedChatId: null,
        contacts: []
    };

    constructor(props) {
        super(props);

        this.state = {
            paranjaOpened: false
        };
    }

    getChatsList() {
        const { allChats, onClickChat, selectedChatId, user, meta, contacts, mainComponentChanger }
            = this.props;
        return this.props.chats.getUser.chats.edges.map(chat => chat.node).map(chat => (
            <ChatPreview
                title={chat.name}
                key={Math.random()}
                select={selectedChatId === chat.id}
                currentUserId={user.id}
                meta={meta}
                user={user}
                contacts={contacts}
                onClick={() => {
                    mainComponentChanger('ChatWindow');
                    onClickChat(chat);
                }}
            />
        ));
    }

    toggleParanja = () =>
        this.setState((prev) => ({ paranjaOpened: !prev.paranjaOpened }));

    render() {
        const chats = this.props.chats;
        return (
            <React.Fragment>
                {
                    this.state.paranjaOpened &&
                    <Paranja
                        user={({})}
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
