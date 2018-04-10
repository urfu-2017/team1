import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuIcon from 'react-icons/lib/fa/list';
import Menu from './menu';

import { Header, SearchInput, ChatsList, Paranja } from '../styles/chats';

import Chat from './chat';


export default class Chats extends Component {
    static propTypes = {
        openMenu: PropTypes.bool,
        allChats: PropTypes.arrayOf(PropTypes.object),
        onClickChat: PropTypes.func,
        onClick: PropTypes.func,
        selectedChatId: PropTypes.string,
        user: PropTypes.object,
        meta: PropTypes.object,
    }
    static defaultProps = {
        allChats: [],
        onClickChat: '',
        onClick: '',
        selectedChatId: null,
        openMenu: false,
        user: {},
        meta: {}
    }
    constructor(props) {
        super(props);
        this.state = {};
    }

    getChatsList() {
        const { allChats, onClickChat, selectedChatId, user, meta } = this.props;  
        return allChats.map(chat => (
            <Chat
                key={chat.id}
                select={selectedChatId === chat.id}
                chat={chat}
                currentUserId={user.id}
                meta={meta}
                onClick={() => { onClickChat(chat); }}
            />
        ));
    }

    render() {
        const { onClick, openMenu, user } = this.props;

        return (
            <React.Fragment>
                { openMenu && (
                    <Paranja onClick={() => { onClick(false); }}>
                        <Menu user={user} />
                    </Paranja>
                )}
                <ChatsList>
                    <Header>
                        <div className="header__menu-icon">
                            <MenuIcon onClick={() => { onClick(true); }} />
                        </div>
                        <SearchInput placeholder="Поиск" type="search" />
                    </Header>
                    { this.getChatsList() }
                </ChatsList>
            </React.Fragment>
        );
    }
}
