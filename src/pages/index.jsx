import React from 'react';
import styled from 'styled-components';

import createNextPage from '../lib/createNextPage';
import Chat from '../components/SideBar/chatPreview';
import SideBar from '../components/SideBar/index';
import Contacts from '../components/contacts';
import Profile from '../components/profile';
import initialState from '../initialState';


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
            mainComponentName: 'ChatWindow'
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

    // TODO: there is probably a better solution
    layout = () => {
        // Динамически выбираем, какой комопнент будет отображён в основном окне
        const MainComponent = this.components[this.state.mainComponentName];
        return (
            <Wrapper>
                <SideBar mainComponentChanger={this.changeMainComponent} />
                {/*<MainComponent currentUser={this.props.currentUser} />*/}
            </Wrapper>
        );
    };

    render() {
        return createNextPage(this.layout, { state: this.props.initialState, user: this.props.currentUser }, this.props.dbApiUrl);
    }
}
