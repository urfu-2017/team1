import React from 'react';
import styled from 'styled-components';

import Chat from './Chat';
import SideBar from './SideBar';
import Contacts from './contacts';
import Profile from './profile';
import {Provider as CurrentUserProvider} from '../lib/currentUserContext';
import {UpdateCurrentChatId} from '../graphqlQueries/localState';
import {graphql} from 'react-apollo';


const Wrapper = styled.main`
    height: 100%;
    max-width: 1260px;
    display: flex;
    margin: 0 auto;
    overflow: hidden;
`;


@graphql(UpdateCurrentChatId.query, {
    props: UpdateCurrentChatId.map
})
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainComponentName: 'Chat'
        };
    }

    components = {
        Chat,
        Contacts,
        Profile
    };

    changeMainComponent = mainComponentName => event => {
        event && event.target && event.preventDefault();
        this.setState({ mainComponentName });
        if (mainComponentName !== 'Chat')
            this.props.updateCurrentChatId(null);
    };

    render() {
        // Динамически выбираем, какой компонент будет отображён в основном окне
        const MainComponent = this.components[this.state.mainComponentName];
        return (
            <Wrapper>
                <CurrentUserProvider value={this.props.currentUser}>
                    <SideBar mainComponentChanger={this.changeMainComponent}/>
                    <MainComponent mainComponentChanger={this.changeMainComponent}/>
                </CurrentUserProvider>
            </Wrapper>
        );
    }
}
