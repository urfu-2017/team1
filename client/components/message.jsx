import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MessageWrapper } from '../styles/message';
import marked from 'marked';
import emoji from 'node-emoji';

export default class Message extends Component {
    static propTypes = {
        fromMe: PropTypes.bool,
        message: PropTypes.string,
        creationTime: PropTypes.string,
        metadata: PropTypes.object
    };

    static defaultProps = { fromMe: '', message: '', creationTime: '', metadata: {}}

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { message, creationTime, fromMe, metadata } = this.props;
        const ogdata = metadata.ogdata;
        return (
            <MessageWrapper fromMe={fromMe}>
                <div className="messageBlock">
                    {/* <div className="massageBlock__time">{creationTime}</div> */}
                    <div
                        className="messageBlock__text"
                        fromMe={fromMe}
                        dangerouslySetInnerHTML={{ __html: emoji.emojify(marked(message), res => res) }}
                    />
                    { ogdata && Object.keys(ogdata).length !== 0 &&
                    <div className="metadata">
                        <a href={ogdata.url} className="metadata-container">
                            <img className="metadata-container__img" src={ogdata.image.url} alt="{ogdata.title}" />
                            <div className="metadata-container__title">{ogdata.title}</div>
                        </a>
                    </div>}
                </div>
            </MessageWrapper>
        );
    }
}
