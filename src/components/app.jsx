import React from 'react';
import styled from 'styled-components';
import {graphql} from 'react-apollo';

import {grey800} from 'material-ui/styles/colors';
import LoadScreen from './ui/loadScreen';
import {GetCurrentUser} from '../graphql/queries';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Chat from './Chat';
import SideBar from './SideBar';
import Contacts from './contacts';
import Profile from './profile';
import {Wrapper, getTheme} from '../styles/app';

import {Provider as CurrentUserProvider} from '../lib/currentUserContext';
import {Provider as UiThemeProvider} from '../lib/withUiTheme';
import {
    SubscribeToCurrentUser, SubscribeToUserChats, SubscribeToUsersHavingPersonalChats
}
    from '../graphql/subscriptions';
import {userSubscriptionDataHandler, chatSubscriptionDataHandler} from '../graphql/dataHandlers';
import withLocalState from '../lib/withLocalState';

@withLocalState
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

        this.state = {
            mainComponentName: 'Chat',
            mainComponentProps: null,
            currentChatId: '',
            isNightTheme: false,
            toggleUiTheme: this.toggleUiTheme
        };
    }

    components = {
        Chat,
        Contacts,
        Profile
    };

    changeMainComponent = mainComponentName => (event, mainComponentProps) => {
        event && event.target && event.preventDefault();
        this.setState({ mainComponentName, mainComponentProps });
        if (mainComponentName !== 'Chat') {
            this.props.updateCurrentChatId(null);
        }
    };

    toggleUiTheme = () => this.setState(prev => ({ isNightTheme: !prev.isNightTheme }));

    render() {
        // Динамически выбираем, какой компонент будет отображён в основном окне
        const MainComponent = this.components[this.state.mainComponentName];
        const { currentUser } = this.props;
        !currentUser.error && !currentUser.loading && this.subscribe();
        return (
            <UiThemeProvider value={{isNightTheme: this.state.isNightTheme, toggleUiTheme: this.state.toggleUiTheme}}>
                <MuiThemeProvider muiTheme={getMuiTheme(getTheme(this.state.isNightTheme))}>
                    <Wrapper>
                        {currentUser.error && <p>Error</p> ||
                        currentUser.loading && App.LoadScreen ||
                        (
                            <CurrentUserProvider value={currentUser}>
                                <SideBar mainComponentChanger={this.changeMainComponent}
                                />
                                <MainComponent {...this.state.mainComponentProps}
                                               mainComponentChanger={this.changeMainComponent}/>
                            </CurrentUserProvider>
                        )
                        }
                    </Wrapper>
                </MuiThemeProvider>
            </UiThemeProvider>
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
