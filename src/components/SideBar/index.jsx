import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import {Scrollbars} from 'react-custom-scrollbars';

import {withCurrentUser} from '../../lib/currentUserContext';
import ChatPreview from './chatPreview';
import Paranja from './paranja';
import {Header, SearchInput, ChatsList} from '../../styles/chats';
import Chat from '../Chat';
import withLocalState from '../../lib/withLocalState';


@withCurrentUser
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

    render() {
        const { currentUser, toggleUiTheme } = this.props;

        return (
            <React.Fragment>
                {
                    this.state.paranjaOpened &&
                    <Paranja
                        currentUser={currentUser}
                        toggleParanja={this.toggleParanja}
                        toggleUiTheme={toggleUiTheme}
                        mainComponentChanger={this.props.mainComponentChanger}
                    />
                }
                <ChatsList>
                    <AppBar className="menuHeader"
                        style={{'min-height': '59px', 'max-height': '59px' }}
                        onClick={this.toggleParanja}
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                    />

                    <Scrollbars universal>
                        { currentUser.chats && this.getChatsList(currentUser) }
                    </Scrollbars>
                </ChatsList>
            </React.Fragment>
        );
    }
}
