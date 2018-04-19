import React from 'react';

import marked from 'marked';
import emoji from 'node-emoji';
import PropTypes from 'prop-types';
import { MessageWrapper, Text, Time } from '../styles/message';


export default class Message extends React.Component {
    static propTypes = {
        fromMe: PropTypes.string,
        message: PropTypes.string,
        creationTime: PropTypes.string
    };

    static defaultProps = { fromMe: '', message: '', creationTime: '' }

    render() {
        const { message, creationTime, fromMe } = this.props;
        return (
            <MessageWrapper fromMe={fromMe}>
                <Text
                    fromMe={fromMe}
                    dangerouslySetInnerHTML={{ __html: emoji.emojify(marked(message), res => res) }}
                />
                <Time>{creationTime}</Time>
            </MessageWrapper>
        );
    }
}
