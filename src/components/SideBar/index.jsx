import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from 'react-icons/lib/fa/list';
import {Scrollbars} from 'react-custom-scrollbars';
import {graphql} from 'react-apollo';

import LoadScreen from '../ui/loadScreen';
import {withCurrentUser} from '../../lib/currentUserContext';
import {GetUserChats} from '../../graphqlQueries/queries';
import {SubscribeToUserChats} from '../../graphqlQueries/subscriptions';
import ChatPreview from './chatPreview';
import Paranja from './paranja';
import {Header, SearchInput, ChatsList} from '../../styles/chats';
import Chat from '../Chat';
import withStatusScreens from '../../lib/withStatusScreens';


// TODO: retrieve last messages and sort by modification order
// Первым декоратором получаем объект текущего пользователя, которого нам дал сервер
// Вторым - с помощью этого объекта просим у api все чаты текущего пользователя
@withCurrentUser
@withStatusScreens('Error :(', { offsetPercentage: 10, opacity: 0 })
@graphql(GetUserChats.query, {
    skip: props => !props.currentUser,
    options: ({ currentUser })  => ({
        variables: {
            userId: currentUser.id
        }
    }),
    props: GetUserChats.map
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
        return chats
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
        this.setState(prev => ({ paranjaOpened: !prev.paranjaOpened }));

    subscription = null;

    static subscriptionDataHandler = (previousResult, { subscriptionData, variables }) => {
        if (!previousResult.User) {
            return previousResult;
        }
        return { User: subscriptionData.data.User.node };
    };

    subscribe = () => {
        if (!this.subscription) {
            this.subscription = this.props.data.subscribeToMore({
                document: SubscribeToUserChats.subscription,
                variables: SubscribeToUserChats.vars(this.props.currentUser.id),
                updateQuery: SideBar.subscriptionDataHandler
            });
        }
    };

    render() {
        const { chats, currentUser, loading, error } = this.props;
        if (chats && !loading) {
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
                        { loading ?
                            SideBar.LoadScreen :
                            chats && !error && this.getChatsList()
                        }
                    </Scrollbars>
                </ChatsList>
            </React.Fragment>
        );
    }
}
