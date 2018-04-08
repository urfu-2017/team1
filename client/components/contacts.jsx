import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from 'react-icons/lib/fa/list';

import { Header, SearchInput, ContactsList, Paranja, Menu } from '../styles/contacts';

import Contact from './contact';


export default class Contacts extends React.Component {
    static propTypes = {
        openMenu: PropTypes.bool,
        allChats: PropTypes.arrayOf(PropTypes.object),
        onClickChat: PropTypes.func,
        onClick: PropTypes.func,
        selectedChatId: PropTypes.string
    }
    static defaultProps = { allChats: [], onClickChat: '', onClick: '', selectedChatId: null, openMenu: false }
    constructor(props) {
        super(props);
        this.state = {};
    }

    getContactsList() {
        const { allChats, onClickChat, selectedChatId } = this.props;
        console.log(selectedChatId);
        
        return allChats.map(contact => (
            <Contact
                key={contact.id}
                chatId={contact.id}
                select={selectedChatId === contact.id}
                contact={contact}
                onClick={() => { onClickChat(contact); }}
            />
        ));
    }

    render() {
        const { onClick, openMenu } = this.props;

        return (
            <React.Fragment>
                { openMenu && (
                    <Paranja onClick={() => { onClick(false); }}>
                        <Menu />
                    </Paranja>
                )}
                <ContactsList>
                    <Header>
                        <MenuIcon onClick={() => { console.log('111111'); onClick(true); }} />
                        <SearchInput placeholder="Поиск" type="search" />
                    </Header>
                    { this.getContactsList() }
                </ContactsList>
            </React.Fragment>
        );
    }
}
