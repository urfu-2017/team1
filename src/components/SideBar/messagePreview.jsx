import React from 'react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import stripHtml from '../../lib/stripHtml';
import {withCurrentUser} from '../../lib/currentUserContext';
import formatDate from '../../lib/formatDate';
import {getListItemStyle} from '../../styles/chat';
import {withUiTheme} from '../../lib/withUiTheme';


@withCurrentUser
@withUiTheme
export default class MessagePreview extends React.PureComponent {
    get chat() {
        return this.props.currentUser.chats
            .find(chat => chat.id === this.props.message.chat.id);
    }

    goToMessage = () => {
        const { id: messageId, chat } = this.props.message;
        this.props.goToMessage(chat, messageId);
    };

    render() {
        const chat = this.chat;
        if (chat === undefined) {
            return null;
        }

        const { selected, uiTheme } = this.props;
        const { text, sender, createdAt } = this.props.message;
        const isFromSelf = this.props.currentUser.id === sender.id;
        const primaryText = (
            <span>
                <span>{chat.title}</span>
                <span className="messagePreview__createdAt">{formatDate(createdAt)}</span>
            </span>
        );
        const secondaryText = (
            <p className="messagePreview">
                <span className="messagePreview__sender">
                    {isFromSelf ? 'Вы' : sender.name}{':  '}
                </span>
                <span className="messagePreview__text">
                    {stripHtml(text)}
                </span>
            </p>
        );

        return (
            <React.Fragment>
                <ListItem
                    leftAvatar={<Avatar src={chat.picture}/>}
                    primaryText={primaryText}
                    secondaryText={secondaryText}
                    secondaryTextLines={1}
                    innerDivStyle={
                        getListItemStyle(selected, uiTheme.isNightTheme)}
                    onClick={this.goToMessage}
                />
            </React.Fragment>
        );
    }
}
