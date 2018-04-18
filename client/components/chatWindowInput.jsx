import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Textarea from '../styles/chatWindowInput';
import { cursorIsPressedFromBelow, moveCursorDown }
    from '../actions/actions';

class ChatWindowInput extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        asyncSendMessage: PropTypes.func,
        currentChatId: PropTypes.string,
        currentUserId: PropTypes.string,
        serverURL: PropTypes.string,
        allChats: PropTypes.arrayOf(PropTypes.object),
        addMessageFromChatInput: PropTypes.func
    }

    static defaultProps = {
        addMessageFromChatInput: () => {},
        asyncSendMessage: () => {},
        onClick: () => {},
        currentChatId: '',
        currentUserId: '',
        serverURL: '',
        allChats: []
    }

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
            const {
                onClick,
                asyncSendMessage,
                addMessageFromChatInput
            } = this.props;
            addMessageFromChatInput(message);

            if (cursorInBottom) {
                moveCursorDown();
            }
            
            asyncSendMessage(message, serverURL);
            // @lms: этот хак сделан для обновления чата, который пришел через сокет
            // todo: удалить и сделать нормально
            let chat = this.props.allChats.find(x => x.id === currentChatId);
            onClick(chat);

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