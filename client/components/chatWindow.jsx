import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatWindowWrapper from '../styles/chatWindow';
import { ParanjaWrapper } from '../styles/paranja';

import Messages from '../components/messages';
import ChatWindowInput from './chatWindowInput';
import ImageSender from '../containers/imageSender';

import { getChatName } from '../utils/chats';

export default class ChatWindow extends Component {
    static propTypes = {
        sendMessage: PropTypes.func,
        addMessageFromChatInput: PropTypes.func,
        setReactionToMessage: PropTypes.func,
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

    render() {
        const {
            chat,
            user,
            sendMessage,
            addMessageFromChatInput,
            socketURL,
            setReactionToMessage,
            setImageSenderState,
            imageSenderState
        } = this.props;

        return chat._id ?
            <ChatWindowWrapper>
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
                { imageSenderState && (
                    <ImageSender
                        user={user}
                        chat={chat}
                        setImageSenderState={setImageSenderState}
                    />
                )}
            </ChatWindowWrapper > : <ChatWindowWrapper />;
    }
}
