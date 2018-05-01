import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatWindowWrapper from '../styles/chatWindow';

import Messages from '../containers/messages';
import ChatWindowInput from './chatWindowInput';

import GroupChatCreate from '../containers/groupChat/groupChatCreate';
import GroupChatEdit from '../containers/groupChat/groupChatEdit';

import { getChatName } from '../utils/chats';

export default class ChatWindow extends Component {
    static propTypes = {
        sendMessage: PropTypes.func,
        addMessageFromChatInput: PropTypes.func,
        setReactionToMessage: PropTypes.func,
        groupChatEditorState: PropTypes.bool,
        editedChat: PropTypes.shape(),
        user: PropTypes.shape(),
        chat: PropTypes.shape(),
        socketURL: PropTypes.string
    };

    static defaultProps = {
        chat: {},
        user: {}
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    getChatWindowComponent() {
        const { groupChatEditorState, chat, user, sendMessage, addMessageFromChatInput, socketURL, setReactionToMessage, editedChat } = this.props;

        if (groupChatEditorState) {
            return <GroupChatCreate />;
        }
        if (editedChat != null) {
            return <GroupChatEdit />
        }
        if (chat._id) {
            return (<ChatWindowWrapper>
                <Messages
                    title={getChatName(chat, user)}
                    user={user}
                    chat={chat}
                    onReceiveMessage={addMessageFromChatInput}
                    setReactionToMessage={setReactionToMessage}
                    socketURL={socketURL}
                />
                <ChatWindowInput
                    sendMessage={sendMessage}
                    addMessageFromChatInput={addMessageFromChatInput}
                    chat={chat}
                    user={user}
                />
            </ChatWindowWrapper >);
        }
        return <ChatWindowWrapper />;
    }
    
    render() {
        return this.getChatWindowComponent();
    }
}
