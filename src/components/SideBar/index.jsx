import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from 'react-icons/lib/fa/list';
import {Scrollbars} from 'react-custom-scrollbars';
import {graphql} from 'react-apollo';

import {withCurrentUser} from '../../lib/currentUserContext';
import { GetUserChats } from '../../graphqlQueries/chats'
import ChatPreview from './chatPreview';
import Paranja from './paranja';
import {Header, SearchInput, ChatsList} from '../../styles/chats';


// TODO: retrieve last messages and sort by modification order
// Первым декоратором получаем объект текущего пользователя, который нам дал сервер
// Вторым - с помощью этого объекта просим у api все чаты текущего пользователя
// TODO: prop alias
@withCurrentUser
@graphql(GetUserChats.query, {
    // props: GetUserChats.map,  // маппер почему-то не работает
    name: 'chats',
    options: props => ({
        variables: {
            userId: props.currentUser.id
        }
    })
})
export default class SideBar extends React.Component {
    static propTypes = {
        currentUser: PropTypes.object,
        mainComponentChanger: PropTypes.func
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);

        this.state = {
            paranjaOpened: false
        };
    }

    getChatsList() {
        const { currentUser, chats } = this.props;
        // TODO: props mapper (see above)
        return chats.getUser.chats.edges.map(edge => edge.node)
            .map(chat => (
                <ChatPreview
                    key={chat.id}
                    chat={chat}
                    user={currentUser}
                    mainComponentChanger={this.props.mainComponentChanger('Chat')}
                />
            ));
    }

    toggleParanja = () =>
        this.setState((prev) => ({ paranjaOpened: !prev.paranjaOpened }));

    render() {
        const { chats, currentUser } = this.props;
        return (
            <React.Fragment>
                {
                    this.state.paranjaOpened &&
                    <Paranja
                        currentUser={currentUser}
                        toggleParanja={this.toggleParanja}
                        mainComponentChanger={this.props.mainComponentChanger}
                    />
                }
                <ChatsList>
                    <Header>
                        <div className="header__menu-icon">
                            <MenuIcon onClick={this.toggleParanja}/>
                        </div>
                        <SearchInput placeholder="Поиск" type="search"/>
                    </Header>
                    <Scrollbars universal>
                    { chats.loading ?
                        <p>Загружаем чаты...</p> :
                        !chats.error && this.getChatsList()
                    }
                    </Scrollbars>
                </ChatsList>
            </React.Fragment>
        );
    }
}
