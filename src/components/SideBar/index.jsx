import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from 'react-icons/lib/fa/list';
import {Scrollbars} from 'react-custom-scrollbars';
import {graphql} from 'react-apollo';

const OverlayLoader = dynamic(import('react-loading-indicator-overlay/lib/OverlayLoader'), { ssr: false });

import {withCurrentUser} from '../../lib/currentUserContext';
import {GetUserChats} from '../../graphqlQueries/chats';
import {SUBSCRIBE_USER_CHATS_UPDATES_ql} from '../../graphqlQueries/users';
import ChatPreview from './chatPreview';
import Paranja from './paranja';
import {Header, SearchInput, ChatsList} from '../../styles/chats';
import dynamic from 'next/dynamic';
import {SubscribeNewMessages} from '../../graphqlQueries/messages';
import Chat from '../Chat';


// TODO: retrieve last messages and sort by modification order
// Первым декоратором получаем объект текущего пользователя, который нам дал сервер
// Вторым - с помощью этого объекта просим у api все чаты текущего пользователя
// TODO: prop alias
@withCurrentUser
@graphql(GetUserChats.query, {
    // props: GetUserChats.map,  // маппер почему-то не работает
    name: 'chats',
    skip: props => !props.currentUser,
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

    static defaultProps = {};

    constructor(props) {
        super(props);

        this.state = {
            paranjaOpened: false
        };
    }

    getChatsList() {
        const { currentUser, chats } = this.props;
        return chats.User.chats
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

    loadScreen = () => (
        (typeof window === 'undefined') ? null :
            <React.Fragment>
                <div style={{ height: '10%' }}/>
                {OverlayLoader.nodeName !== 'P' &&
                <OverlayLoader
                    displayName={'foo'}
                    color={'#7e9cda'}
                    loader="GridLoader"
                    active={true}
                    backgroundColor={'black'}
                    opacity="0"
                />}
            </React.Fragment>
    );

    subscription = null;

    static subscriptionDataHandler = (previousResult, { subscriptionData, variables }) => {
        if (!previousResult.User) {
            return previousResult;
        }
        return { User: subscriptionData.data.User.node };
    };

    subscribe = () => {
        if (!this.subscription) {
            this.subscription = this.props.chats.subscribeToMore({
                document: SUBSCRIBE_USER_CHATS_UPDATES_ql,
                variables: { filter: { node: { id: this.props.currentUser.id } } },
                updateQuery: SideBar.subscriptionDataHandler
            });
        }
    };

    render() {
        const { chats, currentUser } = this.props;
        if (chats && !chats.loading) {
            this.subscribe();
        }
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
                        {chats && chats.loading ?
                            this.loadScreen() :
                            chats && !chats.error && this.getChatsList()
                        }
                    </Scrollbars>
                </ChatsList>
            </React.Fragment>
        );
    }
}
