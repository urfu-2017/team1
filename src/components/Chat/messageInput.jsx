import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Emoji, emojiIndex } from 'emoji-mart';
import dynamic from 'next/dynamic';

const EmojiPicker = dynamic(
    import('emoji-picker-react'),
    { ssr: false }
);

import { withCurrentUser } from '../../lib/currentUserContext';
import Textarea from '../../styles/chatWindowInput';
import { addNewMessage } from '../../lib/dataHandlers';
import { CreateMessage } from '../../graphqlQueries/mutations';
import { GetChatMessages } from '../../graphqlQueries/queries';


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
        this.state = { message: '' };
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
        text: this.state.message,
        chatId: this.props.currentChatId,
        senderId: this.props.currentUserId,
        pictures: []
    });

    clearState = () => {
        this.setState({ message: '' });
    };

    optimisticResponse = message => ({
        __typename: 'Mutation',
        createMessage: {
            id: -Math.floor(Math.random() * 1000),
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
        });
        const updated = addNewMessage(createMessage, data);
        cache.writeQuery({ query, data: updated });
        this.props.updateMessages((_, { variables }) => updated);
    };

    handleChange = event => this.setState({ message: event.target.value });

    openOrCloseEmojies = () => this.setState({ emoji: !this.state.emoji });

    findEmoji = id => emojiIndex.search(id)
        .filter(x => x.id === id)
        .map(x => x.native);

    addEmojiIntoText = emoji => this.setState({ message: `${this.state.message}${this.findEmoji(emoji)}` });

    onEmojiClick = (_, val) => this.addEmojiIntoText(val.name);

    getPicker = () => (this.state.emoji) ?
    (<EmojiPicker onEmojiClick={this.onEmojiClick} disableDiversityPicker />) : '';

    getButtonWithSmile = () => (
        <div onClick={this.openOrCloseEmojies}
            className="openEmojiButton__style"
            title="Emoji"
        >
            &#x263A;
        </div>
    );

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
                        required />
                    {this.getButtonWithSmile()}
                </div>
                <div class="picker__style">
                    {this.getPicker()}
                </div>
            </Textarea>
        );
    }
}
