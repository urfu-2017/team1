import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import {emojiIndex} from 'emoji-mart';
import dynamic from 'next/dynamic';
import IconButton from 'material-ui/IconButton';
import Mood from 'material-ui/svg-icons/social/mood';
import AddPhoto from 'material-ui/svg-icons/image/add-a-photo';
import Location from 'material-ui/svg-icons/communication/location-on';
import Microphone from 'material-ui/svg-icons/av/mic';

const EmojiPicker = dynamic(
    import('emoji-picker-react'),
    { ssr: false }
);

import {SpeechRecognition} from '../../../lib/speechRecognition';
import {withCurrentUser} from '../../../lib/currentUserContext';
import {Textarea} from '../../../styles/chatWindowInput';
import {getClientSideId} from '../../../graphql/mutations';
import {CreateMessage} from '../../../graphql/mutations';
import MessageImageSender from '../messageImageSender';
import LifeTimeDropOutMenu from '../lifeTimeDropOutMenu';


@withCurrentUser
export default class MessageInput extends React.Component {
    static propTypes = {
        currentChatId: PropTypes.string,
        currentUserId: PropTypes.string,
        emoji: PropTypes.bool,
        groupChat: PropTypes.bool
    };

    static defaultProps = {
        currentChatId: '',
        currentUserId: '',
        emoji: false,
        groupChat: true
    };

    constructor(props) {
        super(props);
        this.speechRecognition = new SpeechRecognition();
        this.state = {
            message: localStorage.getItem(this.storageKey) || '',
            className: "microphone",
            emojiPickerVisible: false
        };
    }

    get storageKey() {
        return `input_${this.props.currentChatId}`;
    }

    clearMessage = () => {
        this.setState({ message: '' });
    };

    handleChange = event => {
        const message = event.target.value;
        this.setMessage(message);
    };

    setMessage = message => {
        this.setState({ message });
        localStorage.setItem(this.storageKey, message);
    }

    toggleEmojiPicker = () => this.setState(
        prev => ({ emojiPickerVisible: !prev.emojiPickerVisible })
    );

    toggleUploadWindow = () => {
        this.setState(prev => ({ uploadWindow: !prev.uploadWindow }));
    };

    setLifeTime = seconds => {
        this.setState({ lifeTimeInSeconds: seconds });
    };

    handleSubmit = event => {
        const { currentChatId, messagesController, resetReply } = this.props;
        if (this.state.message.trim().length === 0) {
            return;
        }
        if (event.which === 13 && !event.shiftKey) {
            event.preventDefault();
            messagesController.createMessage(currentChatId, this.message, this.updateCache);

            localStorage.setItem(this.storageKey, '');
            this.clearMessage();
            resetReply();
        }
    };

    updateCache = (...args) => {
        CreateMessage.update(this.props.currentChatId, ...args);
    };

    get message() {
        const {
            state: { message, lifeTimeInSeconds },
            props: { currentChatId, currentUserId, citedMessage }
        } = this;

        return {
            clientSideId: getClientSideId(),
            text: message.trim(),
            chatId: currentChatId,
            senderId: currentUserId,
            pictures: null,
            citationId: citedMessage && citedMessage.id,
            lifeTimeInSeconds
        };
    };

    findEmoji = id => emojiIndex.search(id)
        .filter(x => x.id === id)
        .map(x => x.native);

    addEmojiIntoText = emoji =>
        this.setState({ message: `${this.state.message}${this.findEmoji(emoji)}` });

    onEmojiClick = (_, val) => this.addEmojiIntoText(val.name);

    componentDidMount() {
        document.addEventListener('click', this.closeEmojiPicker);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.closeEmojiPicker);
    }

    closeEmojiPicker = e => {
        const emojiPicker = ReactDOM.findDOMNode(this.nodeEmojiPicker);
        if (!emojiPicker) {
            return;
        }
        const mood = ReactDOM.findDOMNode(this.nodeMood);
        if (e.target === mood) {
            return;
        }
        if(!emojiPicker.contains(e.target)) {
            this.setState({ emojiPickerVisible: false });
        }
    };

    onSendImage = urlInBase64 => {
        const { currentChatId, messagesController } = this.props;
        const message = this.message;
        message.pictures = [urlInBase64];
        messagesController.createMessage(currentChatId, message, this.updateCache);

        this.toggleUploadWindow();
    };

    getUserLocation = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    resolve(position.coords);
                });
            } else {
                reject()
            }
        })
    }

    getMap = () => this.getUserLocation()
        .then(
            position => {
                const { messagesController, currentChatId } = this.props;
                const lat = position.latitude;
                const lon = position.longitude;
                console.info('pos', position.latitude, position.longitude)

                const message = this.message;
                message.map = {
                    lat,
                    lon,
                    center: [lat.toFixed(2), lon.toFixed(2)],
                    zoom: 10
                };

                messagesController.createMessage(currentChatId, message, this.updateCache);
            }
        )
        .catch(
            error => {
                console.info(`Rejected: ${error}! Sorry, your browser does not support geolocation services.`)
            }
        );


    setClassName = className => {
        this.setState({className});
    }

    setNodeEmojiPicker = node => (this.nodeEmojiPicker = node);

    setNodeMood = node => (this.nodeMood = node);

    render() {
        return (
            <Textarea>
                <div className="inputField__style">
                    <AddPhoto className="icon" onClick={this.toggleUploadWindow}/>
                    <Location className="icon" onClick={ this.getMap }/>
                    <textarea
                        className="textarea__style"
                        onKeyPress={this.handleSubmit}
                        onChange={this.handleChange}
                        placeholder="Сообщение..."
                        value={this.state.message}
                    />
                    {!this.props.groupChat && <LifeTimeDropOutMenu setLifeTime={this.setLifeTime}/>}
                    <IconButton
                        touch={true}
                        disableTouchRipple
                        className={this.state.className}
                        disabled={!this.speechRecognition.Tooltip ? false : true}
                        tooltip={this.speechRecognition.Tooltip}
                        tooltipPosition="top-left"
                        onMouseDown={() => {
                            this.speechRecognition.start(this.setMessage);
                            this.setClassName("pulse");
                        }}
                        onMouseUp={() => {
                            this.speechRecognition.stop();
                            this.setClassName("microphone");
                        }}
                    >
                        <Microphone
/>
                    </IconButton>
                    <Mood className="icon" onClick={this.toggleEmojiPicker} ref={this.setNodeMood}/>
                </div>
                {this.state.uploadWindow &&
                <MessageImageSender
                    onSendImage={this.onSendImage}
                    closeImageSender={this.toggleUploadWindow}/>}
                <div className="picker__style">
                    {this.state.emojiPickerVisible &&
                    <EmojiPicker
                        onEmojiClick={this.onEmojiClick}
                        disableDiversityPicker
                        ref={this.setNodeEmojiPicker}
                    />}
                </div>
            </Textarea>
        );
    }
}
