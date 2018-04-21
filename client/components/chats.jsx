import React, { Component } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import MenuIcon from 'react-icons/lib/fa/list';
import { Scrollbars } from 'react-custom-scrollbars';

import Chat from './chat';
import Paranja from '../containers/paranja';
import { Header, SearchInput, ChatsList } from '../styles/chats';

export default class Chats extends Component {
    static propTypes = {
        allChats: PropTypes.arrayOf(PropTypes.object),
        onClickChat: PropTypes.func,
        showParanja: PropTypes.func,
        selectedChatId: PropTypes.string,
        contacts: PropTypes.arrayOf(PropTypes.object),
        user: PropTypes.shape(),
        meta: PropTypes.shape(),
        currentChat: PropTypes.shape(),
        addNewChatFromSocket: PropTypes.func
    }

    static defaultProps = {
        user: {},
        meta: {},
        allChats: [],
        contacts: [],
        currentChat: {},
        showParanja: () => {},
        onClickChat: () => {},
        selectedChatId: null,
        addNewChatFromSocket: () => {}
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { serverURL, newChatsSocketPrefix } = this.props.meta;

        this.socket = io(serverURL);
        const socketNamespace = `${newChatsSocketPrefix}-${this.props.user.id}`;
        this.socket.on(socketNamespace, data => {
            console.log('got new chat from socket');
            const currentUserId = this.props.user.id;
            this.props.addNewChatFromSocket(data.chat, currentUserId);
        });
    }

    componentWillUnmount() {
        const { serverURL, newChatsSocketPrefix } = this.props.meta;
        this.socket.off(`${newChatsSocketPrefix}-${this.props.user.id}`);
        this.socket.close();
    }

    getChatsList() {
        const { allChats, onClickChat, selectedChatId, user, meta, contacts } = this.props;
        return allChats.map(chat => (
            <Chat
                meta={meta}
                user={user}
                chat={chat}
                key={Math.random()}
                contacts={contacts}
                currentUserId={user.id}
                select={selectedChatId === chat.id}
                onClick={() => { onClickChat(chat); }}
            />
        ));
    }

    render() {
        const {
            user,
            contacts,
            currentChat,
            showParanja
        } = this.props;

        return (
            <React.Fragment>
                <Paranja
                    user={user}
                    contacts={contacts}
                    currentChat={currentChat}
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
