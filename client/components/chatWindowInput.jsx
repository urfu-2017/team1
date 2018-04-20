import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Emoji, emojiIndex } from 'emoji-mart';

import Textarea from '../styles/chatWindowInput';

import {
    asyncSendMessage, addMessageFromChatInput, cursorIsPressedFromBelow, moveCursorDown,
    selectChat, setVisibilityChat
} from '../actions/actions';

class ChatWindowInput extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        currentChatId: PropTypes.string,
        currentUserId: PropTypes.string,
        serverURL: PropTypes.string,
        allChats: PropTypes.arrayOf(PropTypes.object)
    }

    static defaultProps = { dispatch: {}, currentChatId: '', currentUserId: '', serverURL: '', allChats: [] }

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            emoji: false
        };
    }

    handleChange = event => { this.setState({ message: event.target.value }); };

    handleSubmit = event => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            const { currentChatId, currentUserId, serverURL } = this.props;
            const message = {
                content: {
                    text: this.state.message
                },
                chatId: currentChatId,
                senderId: currentUserId,
                userMessageId: Math.random()
            };
            const cursorInBottom = cursorIsPressedFromBelow();
            this.props.dispatch(addMessageFromChatInput(message));

            if (cursorInBottom) {
                moveCursorDown();
            }

            this.props.dispatch(asyncSendMessage(message, serverURL));
            // @lms: этот хак сделан для обновления чата, который пришел через сокет
            // todo: удалить и сделать нормально
            const chat = this.props.allChats.find(x => x.id === currentChatId);
            this.props.dispatch(selectChat(currentChatId));
            this.props.dispatch(setVisibilityChat(chat));

            this.setState({ message: '' });
        }
    };

    openEmojies = () => {
        this.setState({ emoji: true });
    }

    closeEmojies = () => {
        this.setState({ emoji: false });
    }

    findEmoji = id => {
        return emojiIndex.search(id).map(o => o.native);
    }

    addEmojiIntoText = emoji => {
        this.setState({ message: `${this.state.message}${this.findEmoji(emoji.id)}` });
    }

    render() {
        let picker = '';
        if (this.state.emoji) {
            picker = (
                <div className="picker__style">
                    <span>
                        Выберите Emoji
                    </span>
                    <div
                        className="closeEmojiButton__style"
                        onClick={this.closeEmojies}
                        title="Скрыть"
                    >
                        &#x274C;
                    </div>
                    <hr />
                    {
                        ['+1', '-1', 'kissing_heart', 'sparkling_heart', 'gift_heart', 'santa',
                            'yum', 'upside_down_face', 'ok_hand', 'cherry_blossom', 'star-struck',
                            'green_apple'].map(id => {
                            return (
                                <Emoji
                                    className="emoji__style"
                                    onClick={this.addEmojiIntoText.bind(id)}
                                    emoji={{ id }}
                                    size={25}
                                />
                            );
                        })
                    }

                </div>
            );
        } else {
            picker = '';
        }
        return (
            <Textarea>
                <div className="inputField__style">
                    <textarea
                        className="textarea__style"
                        onKeyPress={this.handleSubmit}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="Введите сообщение"
                        value={this.state.message}
                        required
                    />
                    <div onClick={this.openEmojies}
                        className="openEmojiButton__style"
                        title="Emoji"
                    >
                        &#x263A;
                    </div>
                    {picker}
                </div>
            </Textarea>
        );
    }
}

export default connect()(ChatWindowInput);

