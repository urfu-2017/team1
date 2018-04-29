import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import emoji from 'node-emoji';
import moment from 'moment';
import { Emoji, emojiIndex } from 'emoji-mart';

moment.locale('ru');

import { MessageWrapper } from '../styles/message';
import { Reactions } from '../styles/reaction';
import Reaction from './reaction';

export default class Message extends Component {
    static propTypes = {
        fromMe: PropTypes.bool,
        userId: PropTypes.string,
        isSended: PropTypes.bool,
        isSuccess: PropTypes.bool,
        message: PropTypes.string,
        messageId: PropTypes.string,
        creationTime: PropTypes.string,
        reactions: PropTypes.arrayOf(PropTypes.shape()),
        metadata: PropTypes.shape(),
        sender: PropTypes.shape(),
        chat: PropTypes.shape(),
        setReactionToMessage: PropTypes.func
    };

    static defaultProps = { isSended: true, fromMe: '', message: '', creationTime: '', metadata: {} }

    constructor(props) {
        super(props);
        this.state = {};

        this.getReactions = this.getReactions.bind(this);
    }

    getReactions = () => {
        const { messageId, chat, setReactionToMessage } = this.props;
        const { closeReactions } = this;
        const emojies = ['+1', '-1', 'ok_hand', 'heart'];
        return emojies.map(id => {
            return (
                <Emoji
                    key={id}
                    className="emoji__style"
                    onClick={() => {
                        setReactionToMessage(chat, messageId, id);
                        closeReactions();
                    }}
                    emoji={{ id }}
                    size={25}
                />
            );
        });
    }

    openReactions = () => this.setState({ emoji: true });

    closeReactions = () => this.setState({ emoji: false });

    findEmoji = id => emojiIndex.search(id).map(o => o.native);

    render() {
        const {
            message,
            fromMe,
            metadata,
            chat,
            isSuccess,
            isSended,
            userId,
            creationTime,
            sender,
            reactions,
            setReactionToMessage,
            messageId
        } = this.props;
        const { ogdata } = metadata;

        const reactionData = {};

        for (let reaction of reactions) {
            if (reactionData[reaction.reaction] == null) {
                reactionData[reaction.reaction] = {
                    count: 0,
                    isCurrentUser: false
                };
            }
            reactionData[reaction.reaction].count += 1;
            if (reaction.userId === userId) {
                reactionData[reaction.reaction].isCurrentUser = true;
            }
        }

        const reactionComponents = (data => {
            const components = [];
            const reactions = Object.keys(data);
            for (let reaction of reactions) { // eslint-disable-line
                const value = data[reaction];
                components.push(<Reaction
                    key={reaction}
                    count={value.count}
                    isCurrentUser={value.isCurrentUser}
                    reaction={reaction}
                    onReactionClick={() => setReactionToMessage(chat, messageId, reaction)} />)
            }
            return components;
        })(reactionData);

        let picker = '';
        if (this.state.emoji) {
            picker = (
                <div className="picker__style">
                    <span>
                        Выберите Реакцию
                    </span>
                    <div
                        className="closeEmojiButton__style"
                        onClick={this.closeReactions}
                        title="Скрыть"
                    >
                        &#x274C;
                    </div>
                    <hr />
                    <div>
                        {this.getReactions()}
                    </div>
                </div>
            );
        } else {
            picker = '';
        }

        return (
            <MessageWrapper>
                <div className={`messageBlock ${(fromMe ? 'from_me' : 'from_they')}`}>
                    <div className="headerMessageBlock">
                        <div className="nameSender">{sender.name}</div>
                        <div>
                            <div onClick={this.openReactions} className="addReactions">
                                &#x263A;
                            </div>
                            <div className="messageTime">{moment(creationTime).format('LT')}
                                {isSended !== false} {
                                    `\t${isSuccess ? '✓' : '⨯'}`
                                }
                            </div>
                        </div>
                    </div>
                    <div
                        className="messageBlock__text"
                        dangerouslySetInnerHTML={{ __html: emoji.emojify(marked(message), res => res) }}
                    />
                    { ogdata && ogdata.url && Object.keys(ogdata).length !== 0 &&
                    <div className="metadata">
                        <a href={ogdata.url} className="metadata-container">
                            { ogdata.image && <img className="metadata-container__img" src={ogdata.image.url} alt={ogdata.title} /> }
                            <div className="metadata-container__title">{ogdata.title}</div>
                        </a>
                    </div>}
                    {reactionComponents.length > 0 && <Reactions>{reactionComponents}</Reactions>}
                </div>
                {picker}
            </MessageWrapper>
        );
    }
}
