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
        const { lastMessage, chat } = this.props;
        const background = this.isSelected() ? '#e7ebf0' : '';
        const borderTop = '1px solid lavender';
        const borderBottom = '1px solid lavender';
        return (
            <ListItem
                onClick={this.selectThisChat}
                innerDivStyle={{ background, borderTop, borderBottom }}
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
