import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MenuIcon from 'react-icons/lib/fa/list';

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

const MenuIconWrapper = styled.div`
    cursor: pointer;
`;

const ContactsList = styled.section`
    {
        width: 35%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        background: #f2f3dE;
    }

    @media (max-width: 400px)
    {
        width: 100%;
    }
`;

const Paranja = styled.section`
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    background: rgba(0,0,0,.2);
    max-width: 1260px;
`;

const Menu = styled.section`
    width: 25%;
    height: 100%;
    background: #f2f3dE;
`;

const Contact = styled.article`
    width: 84%;
    cursor: pointer;
    height: 50px;
    margin: 4px 0;
    padding: 0 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${props => (props.select ? '#b7c5f5' : '#f2f3dE')};
`;

const ContactHeader = styled.p`
    margin: 0;
    font-weight: bold;
`;

const Sender = styled.i`
    margin: 0 5px 0 0;
`;

const LastMessage = styled.p`
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export default class Contacts extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
        openMenu: PropTypes.bool,
        onClickChat: PropTypes.func,
        selectedChatId: PropTypes.string,
        chats: PropTypes.arrayOf(PropTypes.object)
    }
    static defaultProps = { openMenu: false, chats: [], onClickChat: '', onClick: '', selectedChatId: null }
    constructor(props) {
        super(props);
        this.state = {};
    }

    getContactsList() {
        const { chats, selectedChatId, onClickChat } = this.props;
        return chats.map(contact => {
            return (
                <Contact
                    key={contact.id}
                    onClick={() => { onClickChat(contact); }}
                    select={selectedChatId === contact.id}
                >
                    <ContactHeader>{contact.title}</ContactHeader>
                    <LastMessage>
                        <Sender>{contact.lastMessage.sender.name}:</Sender>
                        <span>{contact.lastMessage.content.text}</span>
                    </LastMessage>
                </Contact>
            );
        });
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
                        <MenuIconWrapper>
                            <MenuIcon onClick={() => { onClick(true); }} />
                        </MenuIconWrapper>
                        <SearchInput placeholder="Поиск" type="search" />
                    </Header>
                    { this.getContactsList() }
                </ContactsList>
            </React.Fragment>
        );
    }
}
