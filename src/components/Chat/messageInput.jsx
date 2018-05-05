import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';
import {emojiIndex} from 'emoji-mart';
import dynamic from 'next/dynamic';

const EmojiPicker = dynamic(
    import('emoji-picker-react'),
    { ssr: false }
);


import Attachfile from 'material-ui/svg-icons/editor/attach-file';
import Mood from 'material-ui/svg-icons/social/mood';

import { withCurrentUser } from '../../lib/currentUserContext';
import Textarea from '../../styles/chatWindowInput';
import { addNewMessage } from '../../lib/dataHandlers';
import { CreateMessage } from '../../graphqlQueries/mutations';
import { GetChatMessages } from '../../graphqlQueries/queries';
import MessageImageSender from './messageImageSender';


@withCurrentUser
@graphql(CreateMessage.mutation, { props: CreateMessage.map })
export default class MessageInput extends React.Component {
    static propTypes = {
        currentChatId: PropTypes.string,
        currentUserId: PropTypes.string,
        emoji: PropTypes.bool,
        updateMessages: PropTypes.func
    };

    static defaultProps = {
        currentChatId: '',
        currentUserId: '',
        emoji: false,
        updateMessages: () => {
        }
    };

    constructor(props) {
        super(props);
        this.state = { message: localStorage.getItem(this.storageKey) || '' };
    }

    get storageKey() {
        return `input_${this.props.currentChatId}`;
    }

    handleSubmit = event => {
        if (this.state.message.trim().length === 0) {
            return;
        }  // TODO: review later
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            const message = this.getMessage();
            // Что это? О_о
            // const cursorInBottom = cursorIsPressedFromBelow();

            this.props.createMessage(message, {
                optimisticResponse: this.optimisticResponse(message),
                update: this.updateCache
            });

            // if (cursorInBottom) {
            //     moveCursorDown();
            // }

            this.clearState();
        }
    };

    getMessage = () => ({
            clientSideId: -Math.floor(Math.random() * 1000),
            text: this.state.message,
            chatId: this.props.currentChatId,
            senderId: this.props.currentUserId,
            pictures: null
    });

    clearState = () => {
        this.setState({ message: '' });
    };

    optimisticResponse = message => ({
        __typename: 'Mutation',
        createMessage: {
            id: message.clientSideId,
            createdAt: (new Date()).toISOString(),
            modifiedAt: null,
            sender: {
                id: this.props.currentUserId,
                __typename: 'User'
            },
            metadata: null,
            reactions: null,
            ...message,
            __typename: 'Message'
        }
    });

    updateCache = (cache, { data: { createMessage } }) => {
        const chatId = this.props.currentChatId;
        const query = GetChatMessages.query(chatId);
        const variables = { chatId };
        const data = cache.readQuery({
            query,
            variables
        }, true);
        const updated = addNewMessage(createMessage, data);
        cache.writeQuery({ query, data: updated });
        this.props.updateMessages((_, { variables }) => updated);
    };

    handleChange = event => {
        const message = event.target.value;
        this.setState({ message });
        localStorage.setItem(this.storageKey, message);
    };

    openOrCloseEmojies = () => this.setState({ emoji: !this.state.emoji });

    findEmoji = id => emojiIndex.search(id)
        .filter(x => x.id === id)
        .map(x => x.native);

    addEmojiIntoText = emoji => this.setState({ message: `${this.state.message}${this.findEmoji(emoji)}` });

    onEmojiClick = (_, val) => this.addEmojiIntoText(val.name);

    getPicker = () => (this.state.emoji) ?
        (<EmojiPicker onEmojiClick={this.onEmojiClick} disableDiversityPicker/>) : '';

    getImageUploadWindow = () => (this.state.uploadWindow) ?
        (<MessageImageSender onSendImage={this.onSendImage} closeImageSender={this.openOrCloseUploadWindow}/>) : '';


    onSendImage = urlInBase64 => {
        const message = this.getMessage();
        message.pictures = [urlInBase64];

        this.props.createMessage(message, {
            optimisticResponse: this.optimisticResponse(message),
            update: this.updateCache
        });
        this.openOrCloseUploadWindow();
    };

    getButtonWithSmile = () => (
        <div onClick={this.openOrCloseEmojies}
             className="openEmojiButton__style"
             title="Emoji"
        >
            <Mood />
        </div>
    );

    getButtonWithImageUpload = () => (
        <div onClick={() => {
            this.openOrCloseUploadWindow();
        }}
            className="clip"
            title="Send picture">
            <Attachfile />
        </div>
    );

    openOrCloseUploadWindow = () => {
        this.setState({ uploadWindow: !this.state.uploadWindow });
    };

    render() {
        return (
            <Textarea>
                <div className="inputField__style">
                    <textarea
                        className="textarea__style"
                        onKeyPress={this.handleSubmit}
                        onChange={this.handleChange}
                        placeholder="Сообщение..."
                        value={this.state.message}
                        required/>
                    {this.getButtonWithImageUpload()}
                    {this.getButtonWithSmile()}
                </div>
                <div>
                    {this.getImageUploadWindow()}
                </div>
                <div className="picker__style">
                    {this.getPicker()}
                </div>
            </Textarea>
        );
    }
}
