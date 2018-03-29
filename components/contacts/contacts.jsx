import React from 'react';

import css from './contacts.css';

import Contact from '../contact/contact';


export default class Contacts extends React.Component {
    render() {
        const contacts = getContactsList(this.props);
        return (
          <React.Fragment>
              <section className={css.contacts}>{ contacts }</section>
            </React.Fragment>
        );
    }
}

function getContactsList({ contacts }) {
    return contacts.map(contact => (
        <Contact
            key={contact.id}
            name={contact.name}
            picture={contact.picture}
        />
    ));
}
