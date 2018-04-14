import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Textarea from '../styles/chatWindowInput';
import { asyncSendMessage, addMessageFromChatInput, saveWeatherData } from '../actions/actions';
import isChatWithWeatherBot from '../bot/typeChat';
import getWeather from '../bot/weather';

class ChatWindowInput extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        currentChatId: PropTypes.string,
        currentUserId: PropTypes.string,
        serverURL: PropTypes.string
    };

    static defaultProps = { dispatch: {}, currentChatId: '', currentUserId: '', serverURL: '' };

    constructor(props) {
        super(props);
        this.state = { message: '' };
    }

    handleChange = event => { this.setState({ message: event.target.value }); };

    handleSubmit = async event => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            const { currentChatId, currentUserId, serverURL } = this.props;
            const message = {
                content: {
                    text: this.state.message,
                },
                chatId: currentChatId,
                senderId: currentUserId,
                userMessageId: Math.random()
            };
            this.props.dispatch(addMessageFromChatInput(message));
            this.props.dispatch(asyncSendMessage(message, serverURL));
            this.setState({ message: '' });

            const chatWithBot = await isChatWithWeatherBot(this.props.currentChatId);
            console.log(`chatWithBot is ${chatWithBot}`);
            if (chatWithBot) {
                console.log('before send request for weather');
                const weather = await getWeather(message.content.text);
                console.log(weather);

                // const background = document.querySelector('#background');
                // background.style.display = 'block';
                // background.style.backgroundImage = "url('https://i.gifer.com/2MZq.gif')";
                console.log('before render');
                this.props.dispatch(saveWeatherData(weather));
                console.log('after render');
            }
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

