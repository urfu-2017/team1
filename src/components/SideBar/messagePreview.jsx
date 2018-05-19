import React from 'react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import stripHtml from '../../lib/stripHtml';
import {withCurrentUser} from '../../lib/currentUserContext';
import formatDate from '../../lib/formatDate';
import {getListItemStyle} from '../../styles/chat';
import {withUiTheme} from '../../lib/withUiTheme';


const VISIBLE_TEXT_WINDOW = 50;  // symbols


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

    get messageText() {
        let { message, matchPosition, searchText } = this.props;
        let text = message.rawText;
        if (matchPosition + searchText.length > VISIBLE_TEXT_WINDOW) {
            const offset = Math.max(0, Math.floor(
                (VISIBLE_TEXT_WINDOW - searchText.length) / 2));
            const sliceStart = Math.max(0, matchPosition - offset);
            const sliceEnd = sliceStart + VISIBLE_TEXT_WINDOW * 2;
            text = `...${text.slice(sliceStart, sliceEnd)}`;
            matchPosition = offset + 3;
        }
        return (
            <span title={message.rawText.slice(0, VISIBLE_TEXT_WINDOW * 2)}>
                {text.slice(0, matchPosition)}
                <mark>
                    {text.slice(matchPosition, matchPosition + searchText.length)}
                </mark>
                {text.slice(matchPosition + searchText.length)}
            </span>
        );
    }

    render() {
        const chat = this.chat;
        if (chat === undefined) {
            return null;
        }

        const { selected, uiTheme } = this.props;
        const { sender, createdAt } = this.props.message;
        const text = this.messageText;
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
                    {text}
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
