import React from 'react';

import moment from 'moment';

import {List} from 'material-ui/List';
import {Divider, Subheader} from 'material-ui';
import PropTypes from 'prop-types';

import ChatPreview from './chatPreview';
import withLocalState from '../../lib/withLocalState';

@withLocalState
export default class ChatsList extends React.Component {
    static propTypes = {
        chatsFilter: PropTypes.func,
        localState: PropTypes.shape(),
        allLastMessageChatToUsers: PropTypes.arrayOf(PropTypes.shape())
    };

    static defaultProps = {
        chatsFilter: () => true,
        allLastMessageChatToUsers: []
    };

    isHasUnreadMessage(chat) {
        const { allLastMessageChatToUsers, localState: { currentChatId } } = this.props;
        const { lastMessage } = chat;
        for (let rel of allLastMessageChatToUsers) {
            if (chat.id === rel.chatId) {
                if (lastMessage && currentChatId !== chat.id) {
                    const lastMessageCreatedAt = moment(lastMessage.createdAt);
                    const relMessageCreateAt = moment(rel.message.createdAt);
                    return lastMessageCreatedAt > relMessageCreateAt;
                } else {
                    return false;
                }
            }
        }
        const isHasLastMessage = Boolean(lastMessage)
        return isHasLastMessage;
    }

    render() {
        const { chats, chatsFilter, onChatClick } = this.props;

        return (
            <List>
                {chats.length ?
                    chats.filter(chatsFilter).map((chat, i) => (
                        <React.Fragment key={chat.id}>
                            <ChatPreview
                                isHasUnreadMessage={this.isHasUnreadMessage(chat)}
                                onChatClick={onChatClick}
                                chat={chat}
                            />
                            {(i < chats.length - 1) && <Divider inset={true}/>}
                        </React.Fragment>
                    )) :
                    <Subheader>
                        Вы не состоите ни в одном чате
                    </Subheader>}
            </List>
        );
    }
}
