import React from 'react';
import styled from 'styled-components';
import {graphql} from 'react-apollo';

import LoadScreen from './ui/loadScreen';
import Chat from './Chat';
import SideBar from './SideBar';
import Contacts from './contacts';
import {GetCurrentUser} from '../graphqlQueries/queries';
import Profile from './profile';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider as CurrentUserProvider} from '../lib/currentUserContext';
import {ChatIdProvider, ChatUpdateProvider} from '../lib/withLocalState';
import {
    SubscribeToCurrentUser, SubscribeToUserChats, SubscribeToUsersHavingPersonalChats
}
    from '../graphqlQueries/subscriptions';
import {userSubscriptionDataHandler, chatSubscriptionDataHandler} from '../lib/dataHandlers';

const muiTheme = getMuiTheme({
    fontFamily: 'Roboto Condensed',
    appBar: {
        height: 65
    }
});

const Wrapper = styled.main`
    height: 100%;
    max-width: 1260px;
    display: flex;
    margin: 0 auto;
    overflow: hidden;
`;


// @withLocalState
@graphql(
    GetCurrentUser.query,
    {
        skip: ({ userId }) => !userId,
        options: ({ userId }) => ({ variables: { userId } }),
        props: GetCurrentUser.map
    }
)
export default class App extends React.Component {
    constructor(props) {
        super(props);

        const { currentChatId } = this.props;
        if (currentChatId) {
            this.updateCurrentChatId(currentChatId);
        }
        this.state = {
            mainComponentName: 'Chat',
            mainComponentProps: null,
            currentChatId: ''
        };
    }

    updateCurrentChatId = id => this.setState({ currentChatId: id });

    components = {
        Chat,
        Contacts,
        Profile
    };

    changeMainComponent = mainComponentName => (event, mainComponentProps) => {
        event && event.target && event.preventDefault();
        this.setState({ mainComponentName, mainComponentProps });
        if (mainComponentName !== 'Chat') {
            this.updateCurrentChatId(null);
        }
    };

    render() {
        // Динамически выбираем, какой компонент будет отображён в основном окне
        const MainComponent = this.components[this.state.mainComponentName];
        const { currentUser } = this.props;
        !currentUser.error && !currentUser.loading && this.subscribe();
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Wrapper>
                    {currentUser.error && <p>Error</p> ||
                    currentUser.loading && App.LoadScreen ||
                    (
                        <ChatIdProvider value={this.state.currentChatId}>
                            <ChatUpdateProvider value={this.updateCurrentChatId}>
                                <CurrentUserProvider value={currentUser}>
                                    <SideBar mainComponentChanger={this.changeMainComponent}/>
                                    <MainComponent {...this.state.mainComponentProps}
                                                   mainComponentChanger={this.changeMainComponent}/>
                                </CurrentUserProvider>
                            </ChatUpdateProvider>
                        </ChatIdProvider>
                    )
                    }
                </Wrapper>
            </MuiThemeProvider>
        );
    }

    userSubscription = null;
    chatsSubscription = null;
    personalChatsSubscription = null;

    subscribe = () => {
        if (!this.userSubscription) {
            this.userSubscription = this.props.data.subscribeToMore({
                document: SubscribeToCurrentUser.subscription,
                variables: SubscribeToCurrentUser.vars(this.props.currentUser.id),
                updateQuery: userSubscriptionDataHandler
            });
        }
        if (!this.chatsSubscription) {
            this.chatsSubscription = this.props.data.subscribeToMore({
                document: SubscribeToUserChats.subscription,
                variables: SubscribeToUserChats.vars(this.props.currentUser.id),
                updateQuery: chatSubscriptionDataHandler
            });
        }
        // TODO: исчезают все чаты
        // if (!this.personalChatsSubscription) {
        //     this.personalChatsSubscription = this.props.data.subscribeToMore({
        //         document: SubscribeToUsersHavingPersonalChats.subscription,
        //         variables: SubscribeToUsersHavingPersonalChats.vars(this.props.currentUser.id),
        //         updateQuery: userSubscriptionDataHandler
        //     });
        // }
    };

    static LoadScreen = <LoadScreen/>;
}
