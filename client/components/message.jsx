import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import emoji from 'node-emoji';
import moment from 'moment';


moment.locale('ru');

import { MessageWrapper } from '../styles/message';

export default class Message extends Component {
    static propTypes = {
        fromMe: PropTypes.bool,
        isSended: PropTypes.bool,
        isSuccess: PropTypes.bool,
        message: PropTypes.string,
        creationTime: PropTypes.string,
        metadata: PropTypes.shape()
    };

    static defaultProps = { isSended: true, fromMe: '', message: '', creationTime: '', metadata: {} }

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { message, fromMe, metadata, isSuccess, isSended } = this.props;
        const { ogdata } = metadata;
        let transformedMessage = message;

        if (isSended !== false) {
            transformedMessage = `${transformedMessage}\t${isSuccess ? '✓' : '⨯'}`;
        }
        return (
            <MessageWrapper>
                <div className={`messageBlock ${(fromMe ? 'from_me' : 'from_they')}`}>
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
                    <div className="massageBlock__time">{moment(creationTime).calendar()}</div>
                </div>
            </MessageWrapper>
        );
    }
}
