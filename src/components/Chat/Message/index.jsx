import React from 'react';
import PropTypes from 'prop-types';
import {graphql, withApollo} from 'react-apollo';
import dynamic from 'next/dynamic';
import Mood from 'material-ui/svg-icons/social/mood';

import {MessageWrapper} from '../../../styles/message';
import {ReactionParanja} from '../../../styles/reaction';
import {GetUser} from '../../../graphql/queries';
import {withCurrentUser} from '../../../lib/currentUserContext';
import ReactionsController from './reactionsController';
import Reactions from './reactions';
import Citation from './citation';
import Metadata from './metadata';
import renderPictures from './pictures';
import renderMap from './map';
import {DeleteMessage} from '../../../graphql/mutations';
import withLocalState from '../../../lib/withLocalState';
import formatDate from '../../../lib/formatDate';

const EmojiPicker = dynamic(
    import('emoji-picker-react'),
    { ssr: false }
);

@withApollo
@withCurrentUser
@withLocalState
@graphql(GetUser.query, {
    options: ({ message: { sender }, forwardParent }) => {
        const userId = forwardParent && forwardParent.sender ? forwardParent.sender.id : sender.id;
        return { variables: { userId } };
    },
    props: GetUser.map
})
@graphql(DeleteMessage.mutation, { props: DeleteMessage.map })
export default class Message extends React.PureComponent {
    static propTypes = {
        toggleParanja: PropTypes.func,
        isFromSelf: PropTypes.bool,
        message: PropTypes.object,
        sender: PropTypes.object,
        currentUser: PropTypes.object,
        replyToMessage: PropTypes.func
    };

    static defaultProps = {
        isFromSelf: false,
        message: {},
        sender: {},
        currentUser: {}
    };

    constructor(props) {
        super(props);

        const { client: apolloClient, currentUser, message } = this.props;
        this.reactionsController = new ReactionsController(
            apolloClient, currentUser.id, message.id, message.reactions);
        this.state = {
            emojiPickerVisible: false,
            mouseOver: false,
            selected: false
        };
        this.hasTtl && this.deleteSelf();
    }

    get hasTtl() {
        return Boolean(this.props.message.lifeTimeInSeconds);
    }

    deleteSelf() {
        const { isFromSelf, message, deleteMessage } = this.props;
        !isFromSelf && deleteMessage({
            messageId: message.id,
            lifeTimeInSeconds: message.lifeTimeInSeconds
        });
    }

    setMouseOver = () => this.setState({ mouseOver: true });

    unsetMouseOver = () => this.setState({ mouseOver: false });

    toggleEmojiPicker = e => {
        e && e.stopPropagation();
        this.setState(prev => ({ emojiPickerVisible: !prev.emojiPickerVisible }));
    };

    toggleSelected = () => {
        if (this.hasTtl) {
            return;
        }
        this.setState(prev => ({ selected: !prev.selected }));
        const { selectMessage } = this.props;
        selectMessage(this.messageWithSender);
    };

    addReactionFromPicker = (e, emoji) => {
        e && e.stopPropagation && e.stopPropagation();
        this.toggleEmojiPicker();
        this.reactionsController.addReaction(emoji.name);
    };

    hiddenParanja = () => this.setState({ emojiPickerVisible: false });

    get messageWithSender() {
        const { message, selectionId, user: sender } = this.props;
        return {
            ...message,
            sender,
            selectionId
        };
    }

    replyToThisMessage = e => e.stopPropagation() ||
        this.props.replyToMessage(this.messageWithSender);

    get userHasForwardOriginChat() {
        if (this._userHasForwardOriginChat === undefined) {
            const { message, currentUser } = this.props;
            this._userHasForwardOriginChat = currentUser.chats
                .find(c => c.id === message.chat.id) !== undefined;
        }
        return this._userHasForwardOriginChat;
    }

    goToForwardOrigin = e => {
        if (!this.userHasForwardOriginChat) return;
        e.stopPropagation();
        const { message, updateCurrentChatId } = this.props;
        window.location.hash = message.id;
        updateCurrentChatId(message.chat.id);
    };

    render() {
        const {
            loading, error, message, user, currentUser,
            isFromSelf, forwardParent, selected
        } = this.props;
        // небольшой костыль: optimistic response присваивает сообщениям
        // рандомный отрицательный id, чтобы не хранить лишнее поле
        const delivered = isFromSelf ? (message.id < 0 ? '  ' : ' ✓') : '';
        const metadata = message.metadata || {};
        const createdAt = formatDate(forwardParent && forwardParent.createdAt || message.createdAt);

        return (
            <React.Fragment>
                <MessageWrapper isFromSelf={isFromSelf} emojiPickerVisible={this.state.emojiPickerVisible}
                                onClick={this.toggleSelected} selected={selected}>
                    <div id={message.id} className="messageBlock"
                         onMouseEnter={this.setMouseOver} onMouseLeave={this.unsetMouseOver}>
                        {forwardParent &&
                        <p
                            style={{ 'cursor': this.userHasForwardOriginChat ? 'pointer' : 'default' }}
                            onClick={this.goToForwardOrigin}
                            className="messageBlock__forwarded-from"
                        >Пересланное сообщение от {message.sender.name}</p>
                        }
                        <div className="messageBlock__header">
                            <img className="msgFromUserPic" src={user && user.avatarUrl} width="30px"/>
                            <div className="msgFromBlock">
                                <span className="msgFromUserName">{user && user.name + delivered}</span>
                            </div>
                            <div className="msgTimeReactionBlock">
                                {!forwardParent && <Mood className="mood" onClick={this.toggleEmojiPicker}/>}
                                {this.state.mouseOver && !this.hasTtl
                                    ? <div onClick={this.replyToThisMessage} className="messageBlock__reply">
                                        Ответить
                                    </div>
                                    : <div className="messageBlock__time">{createdAt}</div>}
                            </div>
                        </div>
                        {message.citation && <Citation message={message.citation}/>}
                        <div
                            className="messageBlock__text"
                            isFromSelf={isFromSelf}
                            dangerouslySetInnerHTML={{ __html: message.text }}
                        />
                        {Object.keys(metadata).length !== 0 && <Metadata metadata={metadata}/>}
                        {message.pictures && renderPictures(message.pictures)}
                        {message.map && renderMap(message.map, '100%', '200px', 11)}
                        {message.reactions && message.reactions.length > 0 &&
                        <Reactions
                            currentUserId={currentUser.id}
                            reactions={message.reactions}
                            addReaction={this.reactionsController.addReaction}
                        />}
                    </div>
                    <div className="pickerStyle">
                        {this.state.emojiPickerVisible && (
                            <EmojiPicker
                                onEmojiClick={this.addReactionFromPicker}
                                disableDiversityPicker
                            />
                        )}
                    </div>
                </MessageWrapper>
                {this.state.emojiPickerVisible &&
                <ReactionParanja
                    onClick={this.hiddenParanja}
                />}
            </React.Fragment>
        );
    }
}
