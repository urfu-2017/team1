import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Textarea from '../styles/chatWindowInput';
import { sendMessage, addMessageFromChatInput, cursorIsPressedFromBelow, moveCursorDown, selectChat, setVisibilityChat }
    from '../actions/actions';

class ChatWindowInput extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        chat: PropTypes.shape(),
        user: PropTypes.shape()
    }

    static defaultProps = { dispatch: {}, chat: {}, user: {} }

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
                message: this.state.message,
                sender: {
                    name: user.name,
                    avatar: user.avatar
                }
            };
            const cursorInBottom = cursorIsPressedFromBelow();
            this.props.dispatch(addMessageFromChatInput(message));

            if (cursorInBottom) {
                moveCursorDown();
            }
            
            this.props.dispatch(sendMessage(chat, message));

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

