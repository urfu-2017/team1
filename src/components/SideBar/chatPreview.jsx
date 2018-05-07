import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import {ChatWrapper, ChatHeader, LastMessage, Sender} from '../../styles/chat';
import {withLocalState} from '../../lib/withLocalState';


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
        const { lastMessage, chat, isNightTheme } = this.props;
        let background = '';
        
        if (this.isSelected()) {
           background = !isNightTheme ? '#e7ebf0' : '#616161';
        }
        const borderColor = isNightTheme ? '#424242' : 'lavender';
        
        return (
            <ListItem
                onClick={this.selectThisChat}
                innerDivStyle={
                    { 
                        background,
                        borderTop: `1px solid ${borderColor}`,
                        borderBottom: `1px solid ${borderColor}`
                    }
                }
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
