import React from 'react';
import PropTypes from 'prop-types';

import css from './contacts.css';

import Contact from '../contact/contact';

export default class Contacts extends React.Component {
    static propTypes = {
        contacts: PropTypes.arrayOf(PropTypes.object)
    }
    static defaultProps = { contacts: [] }
    constructor(props) {
        super(props);
        this.state = {};
    }

    getContactsList() {
        const { contacts } = this.props;

        return contacts.map(contact => (
            <Contact
                key={contact.id}
                name={contact.name}
                picture={contact.picture}
            />
        ));
    }

    render() {
        return (
            <React.Fragment>
                <section className={css.contacts}>{ this.getContactsList() }</section>
            </React.Fragment>
        );
    }
}
