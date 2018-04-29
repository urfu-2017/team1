import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import { Scrollbars } from 'react-custom-scrollbars';

import { ContactsWrapper } from '../styles/contacts';


export default class Contacts extends Component {
    static propTypes = {
        user: PropTypes.shape(),
        onClickChat: PropTypes.func,
        asyncCreateChat: PropTypes.func,
        contacts: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        user: {},
        contacts: [],
        onClickChat: () => {}
    };
    constructor(props) {
        super(props);
        this.state = {};
    }
    getContactsList() {
        const { contacts, onClickChat, user, asyncCreateChat } = this.props;
        return contacts.map(contact => (
            <ListItem
                insetChildren
                primaryText={contact.name}
                key={contact.name + Math.random()}
                leftAvatar={<Avatar src={contact.avatar} />}
                onClick={() => {
                    asyncCreateChat(user._id, contact.userId, onClickChat);
                }}
            />
        ));
    }

    render() {
        return (
            <ContactsWrapper>
                <h1 className="header">Контакты</h1>
                <Scrollbars universal>
                    <List>
                        { this.getContactsList() }
                    </List>
                </Scrollbars>
            </ContactsWrapper>
        );
    }
}
