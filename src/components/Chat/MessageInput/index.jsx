import React from 'react';
import PropTypes from 'prop-types';
import {emojiIndex} from 'emoji-mart';
import dynamic from 'next/dynamic';
import Mood from 'material-ui/svg-icons/social/mood';
import AddPhoto from 'material-ui/svg-icons/image/add-a-photo';
import Location from 'material-ui/svg-icons/communication/location-on';
import Microphone from 'material-ui/svg-icons/av/mic';

const EmojiPicker = dynamic(
    import('emoji-picker-react'),
    { ssr: false }
);

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
        this.state = {
            message: localStorage.getItem(this.storageKey) || '',
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
        this.setState({ message });
        localStorage.setItem(this.storageKey, message);
    };

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
        if (this.state.message.trim().length === 0) {
            return;
        }
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.props.messagesController.createMessage(
                this.message, this.updateCache);

            localStorage.setItem(this.storageKey, '');
            this.clearMessage();
            this.props.resetReply();
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
            text: message,
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

    onSendImage = urlInBase64 => {
        const message = this.message;
        message.pictures = [urlInBase64];

        this.props.messagesController.createMessage(message, this.updateCache);
        this.toggleUploadWindow();
    };

    render() {
        return (
            <Textarea>
                <div className="inputField__style">
                    <AddPhoto className="icon" onClick={this.toggleUploadWindow}/>
                    <Location className="icon"/>
                    <textarea
                        className="textarea__style"
                        onKeyPress={this.handleSubmit}
                        onChange={this.handleChange}
                        placeholder="Сообщение..."
                        value={this.state.message}
                    />
                    {!this.props.groupChat && <LifeTimeDropOutMenu setLifeTime={this.setLifeTime}/>}
                    <Microphone className="icon"/>
                    <Mood className="icon" onClick={this.toggleEmojiPicker}/>
                </div>
                {this.state.uploadWindow &&
                <MessageImageSender
                    onSendImage={this.onSendImage}
                    closeImageSender={this.toggleUploadWindow}/>}
                <div className="picker__style">
                    {this.state.emojiPickerVisible &&
                    <EmojiPicker
                        onEmojiClick={this.onEmojiClick}
                        disableDiversityPicker/>}
                </div>
            </Textarea>
        );
    }
}
