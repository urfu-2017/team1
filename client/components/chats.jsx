import React, { Component } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import MenuIcon from 'react-icons/lib/fa/list';
import { Scrollbars } from 'react-custom-scrollbars';

import Menu from './menu';
import { Header, SearchInput, ChatsList, Paranja, Contacts, Contact } from '../styles/chats';
import Chat from './chat';


export default class Chats extends Component {
    static propTypes = {
        openMenu: PropTypes.bool,
        openContacts: PropTypes.bool,
        chats: PropTypes.arrayOf(PropTypes.object),
        onClickChat: PropTypes.func,
        onClickContacts: PropTypes.func,
        onClick: PropTypes.func,
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
        onClickContacts: '',
        onClick: '',
        selectedChatId: null,
        openMenu: false,
        openContacts: false,
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

    getContactsList() {
        const { onClickChat, contacts, user, asyncCreateChat } = this.props;
        return contacts.map(contact => (
            <Contact
                key={contact._id}
                onClick={() => {
                    asyncCreateChat(user._id, contact.userId, onClickChat);
                }}
            >
                <img src={contact.avatar} alt={contact.name} className="contact__image" />
                <p>{contact.name}</p>
            </Contact>
        ));
    }
    render() {
        const { onClick, openMenu, openContacts, onClickContacts, user } = this.props;

        return (
            <React.Fragment>
                { openMenu && (
                    <Paranja onClick={() => { onClick(false); }}>
                        { !openContacts && (<Menu user={user} onClick={onClickContacts} />)}
                    </Paranja>
                )}
                { openContacts && (
                    <Paranja onClick={() => { onClick(false); onClickContacts(false); }}>
                        <Contacts
                            onClick={() => { onClickContacts(true); }}
                        >
                            <section className="contacts__list">
                                { this.getContactsList() }
                            </section>
                        </Contacts>
                    </Paranja>
                )}
                <ChatsList>
                    <Header>
                        <div className="header__menu-icon">
                            <MenuIcon onClick={() => { onClick(true); }} />
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
