import React from 'react';
import styled from 'styled-components';

import createNextPage from '../lib/createNextPage';
import Chat from '../components/SideBar/chatPreview';
import SideBar from '../components/SideBar/index';
import Contacts from '../components/contacts';
import Profile from '../components/profile';
import { Provider as CurrentUserProvider } from '../lib/currentUserContext';
import { Provider as CurrentChatProvider } from '../lib/currentChatContext';


const Wrapper = styled.main`
    height: 100%;
    max-width: 1260px;
    display: flex;
    margin: 0 auto;
    overflow: hidden;
`;


export default class KilogrammApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainComponentName: 'ChatWindow',
            selectedChatId: null,
            selectChat: this.selectChat
        };
    }

    static async getInitialProps({ req }) {
        return {
            initialState: req.state,
            currentUser: req.user,
            dbApiUrl: req.dbApiUrl
        };
    }

    components = {
        Chat,
        Contacts,
        Profile
    };

    changeMainComponent = mainComponentName => event => {
        event.preventDefault();
        this.setState({ mainComponentName })
    };

    // TODO: manage selected chat in some other way
    selectChat = id => {
        this.setState({ selectedChatId: id });
        this.changeMainComponent('ChatWindow');
    };

    // TODO: there is probably a better solution
    layout = () => {
        // Динамически выбираем, какой компонент будет отображён в основном окне
        const MainComponent = this.components[this.state.mainComponentName];
        return (
            <Wrapper>
                <CurrentUserProvider value={this.props.currentUser} >
                    <CurrentChatProvider value={this.state}>
                        <SideBar mainComponentChanger={this.changeMainComponent} />
                                 selectedChatId={this.state.selectedChatId} />
                        <MainComponent />
                    </CurrentChatProvider>
                </CurrentUserProvider>
            </Wrapper>
        );
    };

    render() {
        return createNextPage(this.layout, this.props.dbApiUrl);
    }
}
