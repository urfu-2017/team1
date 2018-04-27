import React from 'react';
import PropTypes from 'prop-types';
import emoji from 'node-emoji';
import marked from 'marked';

import { MessageWrapper, Text, Time } from '../../styles/message';


export default class Message extends React.PureComponent {
    static propTypes = {
        isFromSelf: PropTypes.bool,
        message: PropTypes.object
    };

    static defaultProps = { isFromSelf: false, message: {} };

    static formatText = text => emoji.emojify(marked(text));

    render() {
        const { message, isFromSelf } = this.props;
        return (
            <MessageWrapper>
                <Text
                    isFromSelf={isFromSelf}
                    dangerouslySetInnerHTML={{ __html: Message.formatText(message.text) }}
                />
                 {/*TODO: у сообщения есть также поле modifiedAt, равное null, если оно не менялось */}
                <Time>{message.createdAt}</Time>
            </MessageWrapper>
        );
    }
}
