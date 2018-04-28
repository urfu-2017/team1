import React from 'react';
import styled from 'styled-components';

import Chat from './Chat';
import SideBar from './SideBar';
import Contacts from './contacts';
import Profile from './profile';
import {Provider as CurrentUserProvider} from '../lib/currentUserContext';
import withLocalState from '../lib/withLocalState';


const Wrapper = styled.main`
    height: 100%;
    max-width: 1260px;
    display: flex;
    margin: 0 auto;
    overflow: hidden;
`;


@withLocalState
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
                    <MainComponent {...this.state.mainComponentProps}
                                   mainComponentChanger={this.changeMainComponent} />
                </CurrentUserProvider>
            </Wrapper>
        );
    }
}
