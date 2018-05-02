import React from 'react';

import PropTypes from 'prop-types';

import { Contact } from '../styles/contacts';
import { SelectContactListWrapper } from '../styles/selectContactListWrapper';

export default class SelectContactList extends React.Component {
    static propTypes = {
        contacts: PropTypes.arrayOf(PropTypes.shape()),
        selectedIds: PropTypes.arrayOf(PropTypes.string)
    }

    static defaultProps = {
        selectedIds: []
    }

    state = {
        selectedIds: this.props.selectedIds
    }

    getContactList(contacts) {
        const { selectedIds } = this.state;
        return contacts.map(contact => {
            const isSelectedContact = selectedIds.includes(contact.userId);
            return (<Contact
                key={contact.userId + Math.random()}
                onClick={() => { this.selectContact(contact); }}
                className={`selected-contact ${isSelectedContact ? 'active' : ''}`}
            >
                <img src={contact.avatar} alt="ава" className="contact__image" />
                <div className="selected-contact__name">{contact.name}</div>
                { isSelectedContact && <div className="selected-contact__active"></div> }
                { !isSelectedContact && <div className="selected-contact__inactive"></div> }
            </Contact>);
        });
    }

    selectContact = contact => {
        const { selectedIds } = this.state;
        const selectedIndex = selectedIds.findIndex(c => c === contact.userId);
        if (selectedIndex === -1) {
            this.state.selectedIds.push(contact.userId);
        } else {
            this.state.selectedIds.splice(selectedIndex, 1);
        }
        this.setState({ selectedIds });
    }

    render() {
        const { contacts } = this.props;

        return (
            <div>
                <SelectContactListWrapper>
                    { this.getContactList(contacts) }
                </SelectContactListWrapper>
            </div>
        );
    }
}
