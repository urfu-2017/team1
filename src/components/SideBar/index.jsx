import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';

import {withCurrentUser} from '../../lib/currentUserContext';
import Paranja from './paranja';
import ChatsList from '../ChatsList';
import {ChatsList as ChatsListStyle} from '../../styles/chats';
import {Scrollbars} from 'react-custom-scrollbars';
import withLocalState from '../../lib/withLocalState';


@withCurrentUser
@withLocalState
export default class SideBar extends React.Component {
    static propTypes = {
        currentUser: PropTypes.object,
        mainComponentChanger: PropTypes.func
    };

    static defaultProps = {};

    state = {
        paranjaOpened: false
    };

    toggleParanja = () =>
        this.setState(prev => ({ paranjaOpened: !prev.paranjaOpened }));

    selectChat = chat => {
        this.props.updateCurrentChatId(chat.id);
        this.props.mainComponentChanger('Chat')();
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
                <ChatsListStyle>
                    <AppBar
                        className="menuHeader"
                        onClick={this.toggleParanja}
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                    />
                    <Scrollbars universal>
                    <ChatsList
                        chats={currentUser.chats}
                        onChatClick={this.selectChat}
                    />
                    </Scrollbars>
                </ChatsListStyle>
            </React.Fragment>
        );
    }
}
