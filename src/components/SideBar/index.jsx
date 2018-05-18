import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';

import {withCurrentUser} from '../../lib/currentUserContext';
import Paranja from './paranja';
import ChatsList from '../ChatsList';
import {ChatsList as ChatsListStyle, clearStyles, searchStyles, searchHintStyles} from '../../styles/chats';
import {Scrollbars} from 'react-custom-scrollbars';
import withLocalState from '../../lib/withLocalState';
import {IconButton, TextField} from 'material-ui';
import Clear from 'material-ui/svg-icons/content/clear';
import SearchResults from './searchResults';


@withCurrentUser
@withLocalState
export default class SideBar extends React.Component {
    static propTypes = {
        currentUser: PropTypes.object,
        mainComponentChanger: PropTypes.func
    };

    static defaultProps = {};

    state = {
        paranjaOpened: false,
        searchText: '',
        forceSearchRefetch: false
    };

    setSearchText = (text = '') => this.setState({ searchText: text });

    clearSearchText = () => this.setState({ searchText: '' });

    setSearchTextFromInput = event => {
        this.setSearchText(event.target.value);
        this.setState({ forceSearchRefetch: false });
    };

    handleSearchKeyPress = event => {
        if (event.which !== 13) {
            return;
        }
        this.setState({ forceSearchRefetch: true });
    };

    get isInSearchMode() {
        return Boolean(this.state.searchText);
    }

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
                        onLeftIconButtonClick={this.toggleParanja}
                        showMenuIconButton={true}
                    >
                        <div className="menuHeader__search">
                            <TextField
                                hintText="Найти..."
                                value={this.state.searchText}
                                onChange={this.setSearchTextFromInput}
                                onKeyPress={this.handleSearchKeyPress}
                                inputStyle={searchStyles}
                                hintStyle={searchHintStyles}
                                underlineFocusStyle={searchStyles}
                                fullWidth={true}
                            />
                            {this.isInSearchMode &&
                            <IconButton
                                className="menuHeader__clear"
                                onClick={this.clearSearchText}
                                iconStyle={clearStyles}>
                                <Clear/>
                            </IconButton>}
                        </div>
                    </AppBar>
                    <Scrollbars universal>
                        {this.isInSearchMode &&
                        <SearchResults
                            currentUserId={currentUser.id}
                            forceRefetch={this.state.forceSearchRefetch}
                            searchText={this.state.searchText}
                            selectChat={this.selectChat}/> ||
                        <ChatsList
                            chats={currentUser.chats}
                            onChatClick={this.selectChat}/>}
                    </Scrollbars>
                </ChatsListStyle>
            </React.Fragment>
        );
    }
}
