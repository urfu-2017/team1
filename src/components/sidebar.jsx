import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from 'react-icons/lib/fa/list';
import { Scrollbars } from 'react-custom-scrollbars';

import Chat from './chat';
import Paranja from './paranja';
import { Header, SearchInput, ChatsList } from '../styles/chats';


export default class SideBar extends React.Component {
    static propTypes = {
        allChats: PropTypes.arrayOf(PropTypes.object),
        onClickChat: PropTypes.func,
        selectedChatId: PropTypes.string,
        contacts: PropTypes.arrayOf(PropTypes.object),
        user: PropTypes.shape(),
        meta: PropTypes.shape(),
        addNewChatFromSocket: PropTypes.func
    };

    static defaultProps = {
        user: {},
        meta: {},
        allChats: [],
        onClickChat: () => {
        },
        selectedChatId: null,
        contacts: [],
        addNewChatFromSocket: () => {
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            paranjaOpened: false
        };
    }

    getChatsList() {
        const { allChats, onClickChat, selectedChatId, user, meta, contacts } = this.props;
        return allChats.map(chat => (
            <Chat
                key={Math.random()}
                select={selectedChatId === chat.id}
                chat={chat}
                currentUserId={user.id}
                meta={meta}
                user={user}
                contacts={contacts}
                onClick={() => {
                    onClickChat(chat);
                }}
            />
        ));
    }

    toggleParanja = () =>
        this.setState((prev) => ({ paranjaOpened: !prev.paranjaOpened }));

    render() {
        return (
            <React.Fragment>
                {
                    this.state.paranjaOpened &&
                    <Paranja user={({})} toggleParanja={this.toggleParanja} />
                }
                <ChatsList onclick={this.toggleParanja}>
                    <Header>
                        <div className="header__menu-icon">
                            <MenuIcon onClick={this.toggleParanja}/>
                        </div>
                        <SearchInput placeholder="Поиск" type="search"/>
                    </Header>
                    <Scrollbars universal>
                        {this.getChatsList()}
                    </Scrollbars>
                </ChatsList>
            </React.Fragment>
        );
    }
}
