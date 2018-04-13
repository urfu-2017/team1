import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MessageWrapper, Text, Time } from '../styles/message';

export default class Message extends Component {
    static propTypes = {
        fromMe: PropTypes.string,
        message: PropTypes.string,
        creationTime: PropTypes.string
    };

    static defaultProps = { fromMe: '', message: '', creationTime: '' }

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { message, creationTime, fromMe } = this.props;
        return (
            <MessageWrapper fromMe={fromMe}>
                <Text fromMe={fromMe} dangerouslySetInnerHTML={{ __html: message }} />
                <Time>{creationTime}</Time>
            </MessageWrapper>
        );
    }
}
