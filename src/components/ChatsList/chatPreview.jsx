import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Brightness from 'material-ui/svg-icons/image/brightness-1';
import {getListItemStyle} from '../../styles/chat';
import {withUiTheme} from '../../lib/withUiTheme';
import withLocalState from '../../lib/withLocalState';


@withUiTheme
@withLocalState
export default class ChatPreview extends React.PureComponent {
    static propTypes = {
        chat: PropTypes.shape(),
        isHasUnreadMessage: PropTypes.bool
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
        const { chat, uiTheme, isHasUnreadMessage } = this.props;
        let extensionAttrs = {};
        if (isHasUnreadMessage) {
            extensionAttrs.rightIcon = <Brightness color='#5682a3' />;
        }
        return (
            <ListItem
                primaryText={chat.title}
                onClick={this.onChatClickHandler}
                innerDivStyle={getListItemStyle(this.isSelected(), uiTheme.isNightTheme)}
                leftAvatar={<Avatar src={chat.picture}/>}
                {...extensionAttrs}
            />
        );
    }
}
