import React from 'react';

import moment from 'moment';

import {List} from 'material-ui/List';
import {Divider, Subheader} from 'material-ui';
import PropTypes from 'prop-types';

import ChatPreview from './chatPreview';
import withLocalState from '../../lib/withLocalState';
import { withCurrentUser } from '../../lib/currentUserContext';

@withCurrentUser
@withLocalState
export default class ChatsList extends React.Component {
    static propTypes = {
        chatsFilter: PropTypes.func,
        currentUser: PropTypes.shape(),
        localState: PropTypes.shape(),
        isHasUnreadDisplay: PropTypes.bool,
        allLastMessageChatToUsers: PropTypes.arrayOf(PropTypes.shape())
    };

    static defaultProps = {
        chatsFilter: () => true,
        isHasUnreadDisplay: false,
        allLastMessageChatToUsers: []
    };

    isHasUnreadMessage(chat) {
        const { allLastMessageChatToUsers, localState: { currentChatId }, currentUser } = this.props;
        const { lastMessage } = chat;
        const isCurrentChat = currentChatId === chat.id;
        const isHasLastMessage = Boolean(lastMessage)
        for (let rel of allLastMessageChatToUsers) {
            if (chat.id === rel.chatId) {
                if (!isCurrentChat && isHasLastMessage) {
                    const lastMessageCreatedAt = moment(lastMessage.createdAt);
                    const relMessageCreateAt = moment(rel.message.createdAt);
                    return lastMessageCreatedAt > relMessageCreateAt;
                } else {
                    return false;
                }
            }
        }
        return !isCurrentChat && isHasLastMessage && lastMessage.sender.id !== currentUser.id;
    }

    render() {
        const { chats, chatsFilter, onChatClick, isHasUnreadDisplay } = this.props;

        return (
            <List>
                {chats.length ?
                    chats.filter(chatsFilter).map((chat, i) => (
                        <React.Fragment key={chat.id}>
                            <ChatPreview
                                isHasUnreadMessage={isHasUnreadDisplay && this.isHasUnreadMessage(chat)}
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
