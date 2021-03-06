import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import {Scrollbars} from 'react-custom-scrollbars';

import LoadScreen from './ui/loadScreen';
import {ContactsWrapper} from '../styles/contacts';
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
        const { clickHandler, currentUser, contacts, contactsFilter, error, loading, handleChange } = this.props;
        if (loading) {
            return ContactsList.LoadScreen;
        }
        if (error || !contacts) {
            return ContactsList.ErrorScreen;
        }
        return contacts
            .filter(contactsFilter.bind(null, this.props))
            .map(contact => ContactsList.getContactsItem(clickHandler, currentUser, contact, handleChange));
    }

    static getContactsItem = (clickHandler, currentUser, contact) => (
        <ListItem
            insetChildren
            primaryText={contact.name}
            key={contact.id}
            leftAvatar={<Avatar className="avatar" src={contact.avatarUrl}/>}
            rightIcon={<CommunicationChatBubble/>}
            onClick={() => clickHandler(currentUser, contact)}
        />
    );

    render() {
        const { title, closeAction } = this.props;
        return (
            <ContactsWrapper>
                <h1
                    className="header"
                >
                    {title}
                </h1>
                <Scrollbars universal>
                    <List>
                        {this.getContactsList()}
                    </List>
                </Scrollbars>
                {closeAction &&
                <div className="buttons">
                    <RaisedButton
                        primary={true}
                        label="Закрыть"
                        onClick={closeAction}/>
                </div>}
            </ContactsWrapper>
        );
    }

    static LoadScreen = <LoadScreen offsetPercentage={30} opacity={0}/>;
    static ErrorScreen = <p>Error :(</p>;
}
