import React, { Component } from 'react';

import PropTypes from 'prop-types';
import MenuIcon from 'react-icons/lib/fa/list';
import { Scrollbars } from 'react-custom-scrollbars';

import Chat from './chat';
import Paranja from './paranja';
import { Header, SearchInput, ChatsList } from '../styles/chats';

export default class Chats extends Component {
    static propTypes = {
        showParanja: PropTypes.func,
        profileEditorState: PropTypes.bool,
        setProfileEditorState: PropTypes.func,
        isOpenParanja: PropTypes.bool,
        chats: PropTypes.arrayOf(PropTypes.object),
        onClickChat: PropTypes.func,
        selectedChatId: PropTypes.string,
        user: PropTypes.shape(),
        fetchChats: PropTypes.func,
        fetchContacts: PropTypes.func
    }

    static defaultProps = {
        chats: [],
        onClickChat: '',
        selectedChatId: null,
        user: {}
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { fetchChats, fetchContacts } = this.props;
        fetchChats();
        fetchContacts();
    }

    getChatsList() {
        const { chats, onClickChat, selectedChatId, user } = this.props;
        return chats.map(chat => (
            <Chat
                key={chat._id}
                select={selectedChatId === chat._id}
                chat={chat}
                user={user}
                onClick={() => { onClickChat(chat); }}
            />
        ));
    }

    render() {
        const { user, isOpenParanja, showParanja, profileEditorState, setProfileEditorState } = this.props;

        return (
            <React.Fragment>
                <Paranja
                    user={user}
                    isOpenParanja={isOpenParanja}
                    showParanja={showParanja}
                    setProfileEditorState={setProfileEditorState}
                    profileEditorState={profileEditorState}
                />
                <ChatsList>
                    <Header>
                        <div className="header__menu-icon">
                            <MenuIcon onClick={() => { showParanja(true); }} />
                        </div>
                        <SearchInput placeholder="Поиск" type="search" />
                    </Header>
                    <Scrollbars universal>
                        { this.getChatsList() }
                    </Scrollbars>
                </ChatsList>
            </React.Fragment>
        );
    }
}
