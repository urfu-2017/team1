import moment from 'moment';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Emoji, emojiIndex } from 'emoji-mart';

import Textarea from '../styles/chatWindowInput';
import { cursorIsPressedFromBelow, moveCursorDown }
    from '../actions/actions';

class ChatWindowInput extends Component {
    static propTypes = {
        addMessageFromChatInput: PropTypes.func,
        sendMessage: PropTypes.func,
        chat: PropTypes.shape(),
        user: PropTypes.shape()
    }

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            emoji: false
        };

        this.getEmojiesPopup = this.getEmojiesPopup.bind(this);
    }

    getEmojiesPopup = () => {
        const emojies = ['+1', '-1', 'kissing_heart', 'sparkling_heart', 'gift_heart', 'santa',
            'yum', 'upside_down_face', 'ok_hand', 'cherry_blossom', 'star-struck',
            'green_apple'];
        return emojies.map(id => {
            return (
                <Emoji
                    className="emoji__style"
                    onClick={this.addEmojiIntoText.bind(id)}
                    emoji={{ id }}
                    size={25}
                />
            );
        });
    }

    handleChange = event => { this.setState({ message: event.target.value }); };

    handleSubmit = event => {
        const { addMessageFromChatInput, sendMessage } = this.props;

        if (event.which === 13 && !event.shiftKey) {
            event.preventDefault();
            const { chat, user } = this.props;
            const message = {
                _id: `${Math.random()}_new_message`,
                sender: {
                    userId: user._id,
                    name: user.name,
                    avatar: user.avatar
                },
                isSended: false,
                message: this.state.message,
                createdAt: moment().format(),
                fromMe: true,
                metadata: {}
            };
            const cursorInBottom = cursorIsPressedFromBelow();
            addMessageFromChatInput(chat, message);
            if (cursorInBottom) {
                moveCursorDown();
            }
            sendMessage(chat, message);

            this.setState({ message: '' });
        }
    };

    openEmojies = () => this.setState({ emoji: true });

    closeEmojies = () => this.setState({ emoji: false });

    findEmoji = id => emojiIndex.search(id).map(o => o.native);

    addEmojiIntoText = emoji =>
        this.setState({ message: `${this.state.message}${this.findEmoji(emoji.id)}` });

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
                    <div>
                        {this.getEmojiesPopup()}
                    </div>
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

export default ChatWindowInput;
