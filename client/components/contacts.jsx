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
        event: PropTypes.string,
        addUserInChat: PropTypes.func,
        onClickChat: PropTypes.func,
        asyncCreateChat: PropTypes.func,
        visibilityAddUser: PropTypes.func,
        contacts: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        user: {},
        event: '',
        contacts: [],
        addUserInChat: () => {},
        onClickChat: () => {},
        asyncCreateChat: () => {},
        visibilityAddUser: () => {}
    };
    constructor(props) {
        super(props);
        this.state = {};
    }
    getContactsList() {
        const {
            user,
            event,
            contacts,
            onClickChat,
            addUserInChat,
            asyncCreateChat,
            visibilityAddUser
        } = this.props;

        return contacts.map(contact => (
            <Contact
                key={contact.name + Math.random()}
                onClick={() => {
                    if (event === 'addUserInChat') {
                        addUserInChat(contact);
                        visibilityAddUser(true);
                    }
                    if (event === 'addNewChat') {
                        const chat = getNewChat(user, contact);
                        asyncCreateChat(chat, contact.id, onClickChat);
                    }
                }}
            >
                <img src={contact.avatar} alt="ава" className="contact__image" />
                <p>{contact.name}</p>
            </Contact>
        ));
    }

    render() {
        return (
            <ContactsWrapper>
                <h1 className="header">Контакты</h1>
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
