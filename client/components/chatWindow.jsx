import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatWindowWrapper from '../styles/chatWindow';
import { ParanjaWrapper } from '../styles/paranja';

import Messages from '../containers/messages';
import ChatWindowInput from './chatWindowInput';
import ImageSender from '../containers/imageSender';

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
        socketURL: PropTypes.string,
        setImageSenderState: PropTypes.func,
        imageSenderState: PropTypes.bool
    };

    static defaultProps = {
        chat: {},
        user: {},
        imageSenderState: false
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    getChatWindowComponent() {
        const {
            groupChatEditorState,
            chat,
            user,
            sendMessage,
            addMessageFromChatInput,
            socketURL,
            setReactionToMessage,
            editedChat,
            imageSenderState,
            setImageSenderState
        } = this.props;

        if (groupChatEditorState) {
            return <GroupChatCreate />;
        }
        if (editedChat != null) {
            return <GroupChatEdit />;
        }
        if (imageSenderState) {
            return (<ImageSender
                user={user}
                chat={chat}
                setImageSenderState={setImageSenderState}
            />);
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
                    setImageSenderState={setImageSenderState}
                />
            </ChatWindowWrapper >);
        }
        return <ChatWindowWrapper />;
    }
    
    render() {
        return this.getChatWindowComponent();
    }
}
