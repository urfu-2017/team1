import React, { Component } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import MenuIcon from 'react-icons/lib/fa/list';

import Menu from './menu';
import { Header, SearchInput, ChatsList, Paranja, Contacts, Contact } from '../styles/chats';
import Chat from './chat';


export default class Chats extends Component {
    static propTypes = {
        openMenu: PropTypes.bool,
        openContacts: PropTypes.bool,
        allChats: PropTypes.arrayOf(PropTypes.object),
        onClickChat: PropTypes.func,
        onClickContacts: PropTypes.func,
        onClick: PropTypes.func,
        selectedChatId: PropTypes.string,
        contacts: PropTypes.arrayOf(PropTypes.object),
        user: PropTypes.object,
        meta: PropTypes.object,
        addNewChatFromSocket: PropTypes.func,
        asyncCreateChat: PropTypes.func,
        addChatFromContacts: PropTypes.func
    }
    static defaultProps = {
        allChats: [],
        onClickChat: '',
        onClickContacts: '',
        onClick: '',
        selectedChatId: null,
        openMenu: false,
        openContacts: false,
        contacts: [],
        user: {},
        meta: {},
        addNewChatFromSocket: {},
        asyncCreateChat: {},
        addChatFromContacts: {}
    }
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { serverURL, newChatsSocketPrefix } = this.props.meta;
        console.log('======================');
        console.log(this.props.meta);
        console.log(newChatsSocketPrefix);
        console.log('++++++++++++++++++1');
        
        this.socket = io(serverURL);
        this.socket.on('user', data => {
            console.log('++++++++++++++++++2');
            const currentUserId = this.props.user.id;
            console.log(currentUserId);
            this.props.addNewChatFromSocket(data.chat, currentUserId);
            // const { currentUserId } = this.props;
            // this.props.dispatch(addChatFromSocket(data.chat, currentUserId));
        });
    }

    componentWillUnmount() {
        this.socket.off('user');
        this.socket.close();
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

    getContactsList() {
        const { contacts, onClickChat, allChats, user, asyncCreateChat, addChatFromContacts } = this.props;

        return contacts.map(contact => (
            <Contact
                key={contact.name + Math.random()}
                onClick={() => {
                    console.log('осправляю запрос');
                    console.log(contact);
                    console.log('******************************');
                    const chat = {
                        title: `${contact.name} and ${user.name}`,
                        picture: 'picture1',
                        creatorId: user.id,
                        usersIds: [user.id, contact.id],
                        userChatId: `${Math.random()}`,
                        lastMessage: {
                            content: {
                                text: 'message text',
                                attachments: [],
                                pictures: []
                            },
                            sender: {
                                name: 'user1',
                                avatar: 'path-to-avatar.jpeg',
                                id: 'ALPHANUMERIC_ID'
                            }
                        },
                        messages: [{
                            content: {
                                text: 'my message kek',
                                attachments: [],
                                pictures: []
                            },
                            senderId: 'USER_ID'
                        }]
                    };
                    addChatFromContacts(chat);
                    asyncCreateChat(chat);
                    console.log('получил новый чат');
                    onClickChat(chat);
                }
                }
            >
                <img src={contact.img} alt="Изображение аватарки" className="contact__image" />
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
                    { this.getChatsList() }
                </ChatsList>
            </React.Fragment>
        );
    }
}
