import React from 'react';
import styled from 'styled-components';
import {graphql} from 'react-apollo';

import Chat from './Chat';
import SideBar from './SideBar';
import Contacts from './contacts';
import {GetCurrentUser} from '../graphqlQueries/queries';
import Profile from './profile';
import {Provider as CurrentUserProvider} from '../lib/currentUserContext';
import withLocalState from '../lib/withLocalState';
import {SubscribeToCurrentUser} from '../graphqlQueries/subscriptions';
import {userSubscriptionDataHandler} from '../lib/dataHandlers';


const Wrapper = styled.main`
    height: 100%;
    max-width: 1260px;
    display: flex;
    margin: 0 auto;
    overflow: hidden;
`;


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
            mainComponentProps: null
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

    render() {
        // Динамически выбираем, какой компонент будет отображён в основном окне
        const MainComponent = this.components[this.state.mainComponentName];
        const { currentUser } = this.props;
        !currentUser.error && !currentUser.loading && this.subscribe();
        return (
            <Wrapper>
                {currentUser.error && <p>Error</p> ||
                currentUser.loading && <p>Loading</p> ||
                (
                    <CurrentUserProvider value={currentUser}>
                        <SideBar mainComponentChanger={this.changeMainComponent}/>
                        <MainComponent {...this.state.mainComponentProps}
                                       mainComponentChanger={this.changeMainComponent}/>
                    </CurrentUserProvider>)
                }
            </Wrapper>
        );
    }

    userSubscription = null;

    subscribe = () => {
        if (!this.userSubscription) {
            this.userSubscription = this.props.data.subscribeToMore({
                document: SubscribeToCurrentUser.subscription,
                variables: SubscribeToCurrentUser.vars(this.props.currentUser.id),
                updateQuery: userSubscriptionDataHandler
            });
        }
    };
}
