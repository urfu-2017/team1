import React from 'react';

import marked from 'marked';
import emoji from 'node-emoji';
import PropTypes from 'prop-types';
import { MessageWrapper, Text, Time } from '../../styles/message';


export default class Message extends React.Component {
    static propTypes = {
        isFromSelf: PropTypes.bool,
        message: PropTypes.string,
        creationTime: PropTypes.string
    };

    static defaultProps = { isFromSelf: false, message: '', creationTime: '' };

    formatMessage = message => emoji.emojify(marked(message), res => res);

    render() {
        const { message, creationTime, isFromSelf } = this.props;
        return (
            <MessageWrapper>
                <Text
                    isFromSelf={isFromSelf}
                    dangerouslySetInnerHTML={{ __html: this.formatMessage(message) }}
                />
                <Time>{creationTime}</Time>
            </MessageWrapper>
        );
    }
}
