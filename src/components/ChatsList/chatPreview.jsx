import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import {getListItemStyle, AvatarStyle} from '../../styles/chat';
import {withUiTheme} from '../../lib/withUiTheme';
import withLocalState from '../../lib/withLocalState';


@withUiTheme
@withLocalState
export default class ChatPreview extends React.PureComponent {
    static propTypes = {
        chat: PropTypes.object
    };

    static defaultProps = {
        chat: {}
    };

    onChatClickHandler = () => {
        const { chat, onChatClick } = this.props;
        onChatClick(chat);
    };

    isSelected = () => this.props.chat.id === this.props.localState.currentChatId;

    render() {
        const { chat, uiTheme } = this.props;
        return (
            <ListItem
                primaryText={chat.title}
                onClick={this.onChatClickHandler}
                innerDivStyle={getListItemStyle(this.isSelected(), uiTheme.isNightTheme)}
                leftAvatar={<Avatar style={AvatarStyle} src={chat.picture}/>}
            />
        );
    }
}
