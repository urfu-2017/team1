import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from '../styles/chatWindowInput';
import { asyncSendMessage, addMessageFromChatInput, cursorIsPressedFromBelow, moveCursorDown }
    from '../actions/actions';

class ChatWindowInput extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        currentChatId: PropTypes.string,
        currentUserId: PropTypes.string
    };

    static defaultProps = { dispatch: {}, currentChatId: '', currentUserId: '' };

    constructor(props) {
        super(props);
        this.state = { message: '' };
    }

    handleChange = event => { this.setState({ message: event.target.value }); };

    handleSubmit = event => {
        event.preventDefault();
        const { currentChatId, currentUserId } = this.props;
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
        this.props.dispatch(asyncSendMessage(message));
        this.setState({ message: '' });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Input
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Введите сообщение"
                    value={this.state.message}
                    required
                />
            </form>
        );
    }
}

export default connect()(ChatWindowInput);

