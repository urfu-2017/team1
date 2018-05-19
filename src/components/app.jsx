import React from 'react';
import {graphql, withApollo} from 'react-apollo';

import LoadScreen from './ui/loadScreen';
import {GetCurrentUser} from '../graphql/queries';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Chat from './Chat';
import SideBar from './SideBar';
import Contacts from './contacts';
import Profile from './profile';
import {Page, Wrapper, getTheme} from '../styles/app';

import {Provider as CurrentUserProvider} from '../lib/currentUserContext';
import {Provider as UiThemeProvider} from '../lib/withUiTheme';
import {
    SubscribeToCurrentUser, SubscribeToUserChats, SubscribeToUsersHavingPersonalChats
}
    from '../graphql/subscriptions';
import {userSubscriptionDataHandler, chatSubscriptionDataHandler} from '../graphql/dataHandlers';
import withLocalState from '../lib/withLocalState';


@withApollo
@withLocalState
@graphql(GetCurrentUser.query, {
    skip: ({ userId }) => !userId,
    options: ({ userId }) => ({ variables: { userId } }),
    props: GetCurrentUser.map
})
export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mainComponentName: 'Chat',
            mainComponentProps: null,
            currentChatId: '',
            savedIsNightTheme: false
        };
    }

    componentDidMount() {
        this.setState({ savedIsNightTheme: JSON.parse(localStorage.getItem('isNightTheme')) });
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

    render() {
        // Динамически выбираем, какой компонент будет отображён в основном окне
        const MainComponent = this.components[this.state.mainComponentName];
        const { currentUser } = this.props;
        if (!currentUser.error && !currentUser.loading) {
            this.subscribe();
        }
        const isNightTheme = currentUser.isNightTheme;
        isNightTheme !== undefined && localStorage
            .setItem('isNightTheme', JSON.stringify(isNightTheme));
        return (
            <UiThemeProvider value={isNightTheme}>
                <MuiThemeProvider muiTheme={getMuiTheme(getTheme(isNightTheme))}>
                    <Page>
                        <Wrapper>
                            {currentUser.error && <p>Error</p> ||
                            currentUser.loading && <App.LoadScreen isNightTheme={this.state.savedIsNightTheme}/> ||
                            (
                                <CurrentUserProvider value={currentUser}>
                                    <SideBar mainComponentChanger={this.changeMainComponent}/>
                                    <MainComponent {...this.state.mainComponentProps}
                                                mainComponentChanger={this.changeMainComponent}/>
                                </CurrentUserProvider>
                            )}
                        </Wrapper>
                    </Page>
                </MuiThemeProvider>
            </UiThemeProvider>
        );
    }

    userSubscription = null;
    chatsSubscription = null;
    personalChatsSubscription = null;

    subscribe = () => {
        const { client: apolloClient, currentUser } = this.props;
        if (!this.userSubscription) {
            this.userSubscription = this.props.data.subscribeToMore({
                document: SubscribeToCurrentUser.subscription,
                variables: SubscribeToCurrentUser.vars(currentUser.id),
                updateQuery: userSubscriptionDataHandler
            });
        }
        if (!this.chatsSubscription) {
            this.chatsSubscription = this.props.data.subscribeToMore({
                document: SubscribeToUserChats.subscription,
                variables: SubscribeToUserChats.vars(currentUser.id),
                updateQuery: chatSubscriptionDataHandler(apolloClient)
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

    static LoadScreen = ({ isNightTheme }) => (
        <div style={{
            position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
            background: isNightTheme ? '#212121' : '#fff'
        }}>
            <LoadScreen/>
        </div>
    );
}
