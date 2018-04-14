import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Textarea from '../styles/chatWindowInput';
import { asyncSendMessage, addMessageFromChatInput, cursorIsPressedFromBelow, moveCursorDown, selectChat,
    setVisibilityChat, saveWeatherData } from '../actions/actions';
import isChatWithWeatherBot from '../bot/typeChat';
import getWeather from '../bot/weather';

const botWeatherId = '92098d13-6542-4c72-83df-033468ed235b';


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
            const background = document.querySelector('#background');
            background.style.display = 'none';
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
            let cursorInBottom = cursorIsPressedFromBelow();
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

            const chatWithBot = await isChatWithWeatherBot(currentChatId);
            console.log(`chatWithBot is ${chatWithBot}`);
            if (chatWithBot) {
                console.log('before send request for weather');
                const weather = await getWeather(message.content.text);
                console.log(weather);
                if (!weather) {
                    const botMessage = {
                        content: {
                            text: 'Произошла Ошибка'
                        },
                        chatId: currentChatId,
                        senderId: botWeatherId,
                        userMessageId: Math.random()
                    };
                    cursorInBottom = cursorIsPressedFromBelow();
                    this.props.dispatch(addMessageFromChatInput(botMessage));

                    if (cursorInBottom) {
                        moveCursorDown();
                    }

                    return;
                }
                background.style.display = 'block';
                const pathToPicture = compilePathToBackground(weather);
                console.log(pathToPicture);
                background.style.backgroundImage = `url(${pathToPicture})`;
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

function compilePathToBackground(weather) {
    const hours = weather.cleanTime.getHours();
    const dayTime = hours >= 5 && hours <= 18 ? 'day' : 'night';
    const id = Math.floor(weather.id / 100) * 100;

    return `/static/images/status_pictures/${id}${dayTime}.jpg`;
}

export default connect()(ChatWindowInput);

