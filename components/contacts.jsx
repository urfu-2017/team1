import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuIcon from 'react-icons/lib/fa/list';

import Contact from './contact';

const Header = styled.header`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const SearchInput = styled.input`
    height: 40px;
    width: 80%;
`;

const ContactsList = styled.section`
    {
        width: 35%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        border: 1px solid #111;
    }

    @media (max-width: 800px)
    {
        width: 100%;
    }
`;

export default class Contacts extends React.Component {
    static propTypes = {
        chats: PropTypes.arrayOf(PropTypes.object),
        onClick: PropTypes.func
    }
    static defaultProps = { chats: [], onClick: '' }
    constructor(props) {
        super(props);
        this.state = {};
    }

    getContactsList() {
        const { chats, onClick } = this.props;
        return chats.map(contact => {
            return (
                <Contact
                    key={contact.id}
                    name={contact.title}
                    // picture={contact.picture}
                    onClick={() => { onClick(contact); }}
                />
            );
        });
    }

    render() {
        return (
            <React.Fragment>
                <ContactsList>
                    <Header>
                        <MenuIcon />
                        <SearchInput placeholder="Поиск" type="search" />
                    </Header>
                    { this.getContactsList() }
                </ContactsList>
            </React.Fragment>
        );
    }
}
