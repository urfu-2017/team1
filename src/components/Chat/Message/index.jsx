import React from 'react';
import PropTypes from 'prop-types';
import {graphql, withApollo} from 'react-apollo';
import dynamic from 'next/dynamic';
import Mood from 'material-ui/svg-icons/social/mood';

import {MessageWrapper} from '../../../styles/message';
import {ReactionParanja} from '../../../styles/reaction';
import {GetUser} from '../../../graphqlQueries/queries';
import {withCurrentUser} from '../../../lib/currentUserContext';
import ReactionsController from './reactionsController';
import Reactions from './reactions';
import Citation from './citation';
import Metadata from './metadata';
import renderPictures from './pictures';
import renderMap from './map';
import {DeleteMessage} from '../../../graphqlQueries/mutations';

const EmojiPicker = dynamic(
    import('emoji-picker-react'),
    { ssr: false }
);

@withApollo
@withCurrentUser
@graphql(GetUser.query, {
    options: ({ message: { sender } }) => ({
        variables: { userId: sender.id }
    }),
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
            mouseOver: false
        };
    }

    setMouseOver = () => this.setState({ mouseOver: true });

    unsetMouseOver = () => this.setState({ mouseOver: false });

    toggleEmojiPicker = () =>
        this.setState(prev => ({ emojiPickerVisible: !prev.emojiPickerVisible }));

    addReactionFromPicker = (_, emoji) => {
        this.toggleEmojiPicker();
        this.reactionsController.addReaction(emoji.name);
    };

    hiddenParanja = () => (this.setState({ emojiPickerVisible: false }));

    static formatDate = new Intl.DateTimeFormat('ru', {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'long'
    }).format;

    get messageWithSender() {
        // TODO: что, если user ещё нет?
        const { message, user: sender } = this.props;
        return {
            ...message,
            sender
        };
    }

    replyToThisMessage = () => this.props.replyToMessage(this.messageWithSender);

    render() {
        const { loading, error, message, user, currentUser, isFromSelf } = this.props;
        // небольшой костыль: optimistic response присваивает сообщениям
        // рандомный отрицательный id, чтобы не хранить лишнее поле
        const delivered = isFromSelf ? (message.id < 0 ? '  ' : ' ✓') : '';
        const ogdata = message.metadata && message.metadata.ogdata || {};

        if (message.lifeTimeInSeconds !== null && !isFromSelf) {
            this.props.deleteMessage({
                messageId: message.id,
                lifeTimeInSeconds: message.lifeTimeInSeconds
            });
        }
        const createdAt = Message.formatDate(new Date(message.createdAt));

        return (
            <React.Fragment>
                <MessageWrapper
                    isFromSelf={isFromSelf}
                    emojiPickerVisible={this.state.emojiPickerVisible}
                >
                    <div id={message.id} className="messageBlock"
                         onMouseEnter={this.setMouseOver} onMouseLeave={this.unsetMouseOver}>
                        <div className="messageBlock__header">
                            <img className="msgFromUserPic" src={user && user.avatarUrl} width="30px"/>
                            <div className="msgFromBlock">
                                <span className="msgFromUserName">{user && user.name + delivered}</span>
                            </div>
                            <div className="msgTimeReactionBlock">
                                <Mood className="mood" onClick={this.toggleEmojiPicker} />
                                {this.state.mouseOver
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
                        {ogdata.url && Object.keys(ogdata).length !== 0 && <Metadata ogdata={ogdata}/>}
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
                    {
                        this.state.emojiPickerVisible &&
                        <div
                            className="message__paranja"
                            onClick={this.hiddenParanja}
                        />
                    }
                </MessageWrapper>
                {this.state.emojiPickerVisible &&
                    <ReactionParanja
                        onClick={this.hiddenParanja}
                    />
                }
            </React.Fragment>
        );
    }
}
