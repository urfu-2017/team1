import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import {getListItemStyle, ChatWrapper, ChatHeader, LastMessage, Sender} from '../../styles/chat';
import { withUiTheme } from '../../lib/withUiTheme';
import withLocalState from '../../lib/withLocalState';


@withUiTheme
@withLocalState
export default class ChatPreview extends React.PureComponent {
    static propTypes = {
        chat: PropTypes.object,
        updateCurrentChatId: PropTypes.func
    };

    static defaultProps = {
        chat: {}
    };

    // Не создаём новую функцию при каждом рендере
    selectThisChat = () => {
        this.props.updateCurrentChatId(this.props.chat.id);
        this.props.mainComponentChanger();
    };

    isSelected = () => this.props.chat.id === this.props.localState.currentChatId;

    render() {
        const { lastMessage, chat, uiTheme } = this.props;    
        return (
            <ListItem
                onClick={this.selectThisChat}
                innerDivStyle={getListItemStyle(this.isSelected(), uiTheme.isNightTheme)}
                leftAvatar={<Avatar src={chat.picture} />}
                primaryText={chat.title}
                secondaryText={
                    lastMessage && lastMessage.content && lastMessage.sender &&
                    <LastMessage>
                        <Sender>{lastMessage.sender.name}:</Sender>
                        <span>{lastMessage.content.text}</span>
                    </LastMessage>
                }
            />
        );
    }
}
