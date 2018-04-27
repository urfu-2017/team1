import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import emoji from 'node-emoji';
import moment from 'moment';
import { Emoji, emojiIndex } from 'emoji-mart';


moment.locale('ru');

import { MessageWrapper } from '../styles/message';

export default class Message extends Component {
    static propTypes = {
        fromMe: PropTypes.bool,
        isSended: PropTypes.bool,
        isSuccess: PropTypes.bool,
        message: PropTypes.string,
        creationTime: PropTypes.string,
        metadata: PropTypes.shape(),
        sender:  PropTypes.shape()
    };

    static defaultProps = { isSended: true, fromMe: '', message: '', creationTime: '', metadata: {} }

    constructor(props) {
        super(props);
        this.state = {};

        this.getReactions = this.getReactions.bind(this);
    }

    getReactions = () => {
        const emojies = ['+1', '-1', 'ok_hand', 'heart'];
        return emojies.map(id => {
            return (
                <Emoji
                    className="emoji__style"
                    onClick={this.closeReactions}
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
        const { message, fromMe, metadata, isSuccess, isSended, creationTime, sender } = this.props;
        const { ogdata } = metadata;
        let transformedMessage = message;
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
                        <div onClick={this.openReactions} className="addReactions">
                            &#x263A;
                        </div>
                        <div className="messageTime">{moment(creationTime).format('LT')}
                            {isSended !== false} {
                                `\t${isSuccess ? '✓' : '⨯'}`
                        }</div>
                    </div>
                    <div
                        className="messageBlock__text"
                        dangerouslySetInnerHTML={{ __html: emoji.emojify(marked(transformedMessage), res => res) }}
                    />
                    { ogdata && Object.keys(ogdata).length !== 0 &&
                    <div className="metadata">
                        <a href={ogdata.url} className="metadata-container">
                            <img className="metadata-container__img" src={ogdata.image.url} alt="{ogdata.title}" />
                            <div className="metadata-container__title">{ogdata.title}</div>
                        </a>
                    </div>}
                </div>
                {picker}
            </MessageWrapper>
        );
    }
}
