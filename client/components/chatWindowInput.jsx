import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Textarea from '../styles/chatWindowInput';
import { sendMessage, addMessageFromChatInput, cursorIsPressedFromBelow, moveCursorDown }
    from '../actions/actions';

class ChatWindowInput extends Component {
    static propTypes = {
        addMessageFromChatInput: PropTypes.func,
        sendMessage: PropTypes.func,
        chat: PropTypes.shape(),
        user: PropTypes.shape()
    }

    static defaultProps = { addMessageFromChatInput, sendMessage, chat: {}, user: {} }

    constructor(props) {
        super(props);
        this.state = { message: '' };
    }

    handleChange = event => { this.setState({ message: event.target.value }); };

    handleSubmit = event => {
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
                message: this.state.message,
                createdAt: '',
                fromMe: true,
                metadata: {}
            };
            const cursorInBottom = cursorIsPressedFromBelow();
            this.props.addMessageFromChatInput(chat, message);

            if (cursorInBottom) {
                moveCursorDown();
            }

            this.props.sendMessage(chat, message);

            this.setState({ message: '' });
        }
    };

    render() {
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
            </Textarea>
        );
    }
}

export default connect()(ChatWindowInput);

