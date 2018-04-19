import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Picker } from 'emoji-mart';
// import 'emoji-mart/css/emoji-mart.css';
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
            emoji: false,
            emojiSymbol: ''
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

    emojiesVisible = () => {
        this.setState({ emoji: true });
    }

    closeEmojies = () => {
        this.setState({ emoji: false });
    }

    addSmileIntoText = () => {
        this.setState({ message: `${this.state.message}😃` });
    }

    addSantaIntoText = () => {
        this.setState({ message: `${this.state.message}🎅` });
    }

    addGiftIntoText = () => {
        this.setState({ message: `${this.state.message}🎁` });
    }

    addFingerIntoText = () => {
        this.setState({ message: `${this.state.message}🖕` });
    }

    addOkIntoText = () => {
        this.setState({ message: `${this.state.message}👌` });
    }

    addMinusIntoText = () => {
        this.setState({ message: `${this.state.message}👎` });
    }

    addPlusIntoText = () => {
        this.setState({ message: `${this.state.message}👍` });
    }

    addFlowerIntoText = () => {
        this.setState({ message: `${this.state.message}🌸` });
    }

    addFoodIntoText = () => {
        this.setState({ message: `${this.state.message}🍏` });
    }

    addKissIntoText = () => {
        this.setState({ message: `${this.state.message}💋` });
    }

    addLoveIntoText = () => {
        this.setState({ message: `${this.state.message}💖` });
    }

    render() {
        let picker = '';
        if (this.state.emoji) {
            picker = (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '60px',
                        right: '30px',
                        background: '#b7c5f5',
                        padding: '5px',
                        borderRadius: '5px',
                        border: '1px solid #b7c5f5',
                        cursor: 'pointer'
                    }}
                >
                    <Emoji
                        onClick={this.addLoveIntoText}
                        emoji={{ id: 'sparkling_heart' }}
                        size={16}
                        style={{ padding: '5px' }}
                    />

                    <Emoji
                        onClick={this.addKissIntoText}
                        emoji={{ id: 'kiss' }}
                        size={16}
                        style={{ padding: '5px', cursor: 'pointer' }}
                    />

                    <Emoji
                        onClick={this.addFoodIntoText}
                        emoji={{ id: 'green_apple' }}
                        size={16}
                        style={{ padding: '5px', cursor: 'pointer' }}
                    />

                    <Emoji
                        onClick={this.addFlowerIntoText}
                        emoji={{ id: 'cherry_blossom' }}
                        size={16}
                        style={{ padding: '5px', cursor: 'pointer' }}
                    />

                    <Emoji
                        onClick={this.addPlusIntoText}
                        emoji={{ id: '+1' }}
                        size={16}
                        style={{ padding: '5px', cursor: 'pointer' }}
                    />

                    <Emoji
                        onClick={this.addMinusIntoText}
                        emoji={{ id: '-1' }}
                        size={16}
                        style={{ padding: '5px', cursor: 'pointer' }}
                    />

                    <Emoji
                        onClick={this.addOkIntoText}
                        emoji={{ id: 'ok_hand' }}
                        size={16}
                        style={{ padding: '5px', cursor: 'pointer' }}
                    />

                    <Emoji
                        onClick={this.addFingerIntoText}
                        emoji={{ id: 'middle_finger' }}
                        size={16}
                        style={{ padding: '5px', cursor: 'pointer' }}
                    />

                    <Emoji
                        onClick={this.addGiftIntoText}
                        emoji={{ id: 'gift' }}
                        size={16}
                        style={{ padding: '5px', cursor: 'pointer' }}
                    />

                    <Emoji
                        onClick={this.addSantaIntoText}
                        emoji={{ id: 'santa', skin: 3 }}
                        size={16}
                        style={{ padding: '5px', cursor: 'pointer' }}
                    />

                    <Emoji
                        onClick={this.addSmileIntoText}
                        emoji={{ id: 'smiley', skin: 3 }}
                        size={16}
                        style={{ padding: '5px', cursor: 'pointer' }}
                    />

                    <div onClick={this.closeEmojies} title='Скрыть' style={{ cursor: 'pointer'}}>&#x274C;</div>
                </div>
            );
        } else {
            picker = '';
        }
        return (
            <Textarea>
                <textarea
                    className="textarea__style"
                    onKeyPress={this.handleSubmit}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Введите сообщение"
                    value={this.state.message}
                    required
                />
                <div onClick={this.emojiesVisible}
                    title='Emoji'
                    style={{ cursor: 'pointer', display: 'inline-block', fontSize: '25px', verticalAlign: 'top' }}>&#x263A;
                </div>
                {picker}
            </Textarea>
        );
    }
}

export default connect()(ChatWindowInput);

