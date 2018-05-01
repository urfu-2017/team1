import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';
import {Scrollbars} from 'react-custom-scrollbars';

import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';

import LoadScreen from './ui/loadScreen';
import {
    Search,
    CloseButton,
    CreateButton,
    ContactsWrapper
} from '../styles/contacts';
import {withCurrentUser} from '../lib/currentUserContext';


@withCurrentUser
export default class ContactsList extends React.Component {
    static propTypes = {
        contactsFilter: PropTypes.func,  // предикат, принимающий (this.props, contact)
        closeAction: PropTypes.func,
        currentUser: PropTypes.object,
        title: PropTypes.string,
        contacts: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        contactsFilter: () => true,
        closeAction: null,
        currentUser: {},
        title: '',
        contacts: []
    };

    getContactsList() {
        const { clickHandler, currentUser, contacts, contactsFilter, error, loading } = this.props;
        if (loading) {
            return ContactsList.LoadScreen;
        }
        if (error || !contacts) {
            return ContactsList.ErrorScreen;
        }
        console.log(1111111);
        console.log(contactsFilter);
        log
        
        return contacts
            .filter(contactsFilter.bind(null, this.props))
            .map(contact => ContactsList.getContactsItem(clickHandler, currentUser, contact));
    }

    static getContactsItem = (clickHandler, currentUser, contact) => (
            <ListItem
                key={contact.id}
                insetChildren
                primaryText={contact.name}
                leftAvatar={<Avatar src={contact.avatarUrl} />}
                onClick={() => clickHandler(currentUser, contact)}
            />
    );

    render() {
        const { title, closeAction } = this.props;
        return (
            <ContactsWrapper>
                <h1 className="header">{title}</h1>
                <Search
                    type="search"
                    placeholder="Поиск"
                />
                <Scrollbars universal>
                    <List>
                        { this.getContactsList() }
                    </List>
                </Scrollbars>
                {closeAction &&
                <div className="buttons">
                    <CloseButton type="button" value="Закрыть" onClick={closeAction} />
                </div>}
            </ContactsWrapper>
        );
    }

    static LoadScreen = <LoadScreen offsetPercentage={30} opacity={0}/>;
    static ErrorScreen = <p>Error :(</p>;
}
