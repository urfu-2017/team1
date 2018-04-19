import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

import {
    Search,
    Contact,
    CloseButton,
    ContactsList,
    CreateButton,
    ContactsWrapper
} from '../styles/contacts';


const getNewChat = (user, contact) => ({
    title: `${contact.name}`,
    picture: 'picture1',
    creatorId: user.id,
    usersIds: [user.id, contact.id],
    id: `${Math.random()}`,
    userChatId: `${Math.random()}`
});

export default class Contacts extends Component {
    static propTypes = {
        user: PropTypes.shape(),
        header: PropTypes.string,
        onClickChat: PropTypes.func,
        asyncCreateChat: PropTypes.func,
        contacts: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        user: {},
        header: '',
        contacts: [],
        onClickChat: () => {},
        asyncCreateChat: () => {}
    };
    constructor(props) {
        super(props);
        this.state = {};
    }

    getContactsList() {
        const { contacts, onClickChat, user, asyncCreateChat, addChatFromContacts } = this.props;
        return contacts.map(contact => (
            <Contact
                key={contact.name + Math.random()}
                onClick={() => {
                    const chat = getNewChat(user, contact);
                    asyncCreateChat(chat, contact.id, onClickChat);
                }}
            >
                <img src={contact.avatar} alt="ава" className="contact__image" />
                <p>{contact.name}</p>
            </Contact>
        ));
    }

    render() {
        const { header } = this.props;
        return (
            <ContactsWrapper>
                <h1 className="header"> { header } </h1>
                <Search
                    type="search"
                    placeholder="Поиск"
                />
                <ContactsList>
                    <Scrollbars universal>
                        { this.getContactsList() }
                    </Scrollbars>
                </ContactsList>
                <div className="buttons">
                    <CreateButton type="button" value="Создать" />
                    <CloseButton type="button" value="Закрыть" />
                </div>
            </ContactsWrapper>
        );
    }
}
