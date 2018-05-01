import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatWindowWrapper from '../styles/chatWindow';

import Messages from '../components/messages';
import ChatWindowInput from './chatWindowInput';

import GroupChatCreate from '../containers/groupChatCreate';

import { getChatName } from '../utils/chats';

export default class ChatWindow extends Component {
    static propTypes = {
        sendMessage: PropTypes.func,
        addMessageFromChatInput: PropTypes.func,
        setReactionToMessage: PropTypes.func,
        groupChatEditorState: PropTypes.bool,
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
        const { groupChatEditorState, chat, user, sendMessage, addMessageFromChatInput, socketURL, setReactionToMessage } = this.props;

        if (groupChatEditorState) {
            return <GroupChatCreate />;
        }
        if (chat._id) {
            console.log(chat);
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
