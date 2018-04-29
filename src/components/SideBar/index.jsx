import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from 'react-icons/lib/fa/list';
import {Scrollbars} from 'react-custom-scrollbars';

import LoadScreen from '../ui/loadScreen';
import {withCurrentUser} from '../../lib/currentUserContext';
import {SubscribeToUserChats} from '../../graphqlQueries/subscriptions';
import ChatPreview from './chatPreview';
import Paranja from './paranja';
import {Header, SearchInput, ChatsList} from '../../styles/chats';
import Chat from '../Chat';


@withCurrentUser
export default class SideBar extends React.Component {

    static LoadScreen = <LoadScreen offsetPercentage={10} opacity={0}/>;
    static ErrorScreen = <p>Error :(</p>;
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

    getChatsList(currentUser) {
        const { chats } = currentUser;
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
        const { currentUser } = this.props;
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
                        { currentUser.chats && this.getChatsList(currentUser) }
                    </Scrollbars>
                </ChatsList>
            </React.Fragment>
        );
    }
}
