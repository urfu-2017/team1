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
        selectedChatId: PropTypes.string,
        currentUserId: PropTypes.string,
        initial: PropTypes.object
    }
    static defaultProps = { 
        allChats: [], 
        onClickChat: '', 
        onClick: '', 
        selectedChatId: null, 
        openMenu: false 
    }
    constructor(props) {
        super(props);
        this.state = {};
    }

    getContactsList() {
        const { allChats, onClickChat, selectedChatId, initial } = this.props;
        
        return allChats.map(contact => (
            <Contact
                key={contact.id}
                chatId={contact.id}
                select={selectedChatId === contact.id}
                contact={contact}
                currentUserId={inital.user.id}
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
                        <Menu user={initial.user} />
                    </Paranja>
                )}
                <ContactsList>
                    <Header>
                        <MenuIcon onClick={() => { onClick(true); }} />
                        <SearchInput placeholder="Поиск" type="search" />
                    </Header>
                    { this.getContactsList() }
                </ContactsList>
            </React.Fragment>
        );
    }
}
