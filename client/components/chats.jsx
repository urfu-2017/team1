import React, { Component } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import MenuIcon from 'react-icons/lib/fa/list';
import { Scrollbars } from 'react-custom-scrollbars';

import Chat from './chat';
import Paranja from './paranja';
import { Header, SearchInput, ChatsList } from '../styles/chats';

export default class Chats extends Component {
    static propTypes = {
        openMenu: PropTypes.bool,
        openContacts: PropTypes.bool,
        chats: PropTypes.arrayOf(PropTypes.object),
        onClickChat: PropTypes.func,
        selectedChatId: PropTypes.string,
        contacts: PropTypes.arrayOf(PropTypes.object),
        user: PropTypes.shape(),
        asyncCreateChat: PropTypes.func,
        fetchChats: PropTypes.func,
        fetchContacts: PropTypes.func
    }

    static defaultProps = {
        chats: [],
        onClickChat: '',
        onClick: '',
        selectedChatId: null,
        contacts: [],
        user: {}
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { fetchChats, fetchContacts } = this.props;
        fetchChats();
        fetchContacts();
    }

    getChatsList() {
        const { chats, onClickChat, selectedChatId, user } = this.props;
        return chats.map(chat => (
            <Chat
                key={chat._id}
                select={selectedChatId === chat._id}
                chat={chat}
                user={user}
                onClick={() => { onClickChat(chat); }}
            />
        ));
    }

    render() {
        const { user, isOpenParanja, showParanja } = this.props;

        return (
            <React.Fragment>
                <Paranja
                    user={user}
                    isOpenParanja={isOpenParanja}
                    showParanja={showParanja}
                />
                <ChatsList>
                    <Header>
                        <div className="header__menu-icon">
                            <MenuIcon onClick={() => { showParanja(true); }} />
                        </div>
                        <SearchInput placeholder="Поиск" type="search" />
                    </Header>
                    <Scrollbars universal>
                        { this.getChatsList() }
                    </Scrollbars>
                </ChatsList>
            </React.Fragment>
        );
    }
}
