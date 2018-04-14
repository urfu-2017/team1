import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Textarea from '../styles/chatWindowInput';
import { asyncSendMessage, addMessageFromChatInput, cursorIsPressedFromBelow, moveCursorDown }
    from '../actions/actions';

class ChatWindowInput extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        currentChatId: PropTypes.string,
        currentUserId: PropTypes.string,
        serverURL: PropTypes.string
    }

    static defaultProps = { dispatch: {}, currentChatId: '', currentUserId: '', serverURL: '' }

    constructor(props) {
        super(props);
        this.state = { message: '' };
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

