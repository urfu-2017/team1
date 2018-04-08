import React from 'react';
import PropTypes from 'prop-types';
import { MessageWrapper, Text,  Time } from '../styles/message';

export default class Message extends React.Component {
    static propTypes = {
        from: PropTypes.string,
        message: PropTypes.string,
        creationTime: PropTypes.string
    }

    static defaultProps = { from: '', message: '', creationTime: '' }

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { message, creationTime, from } = this.props;
        return (
            <MessageWrapper from={from}>
                <Text dangerouslySetInnerHTML={{ __html: message }} />
                <Time>{creationTime}</Time>
            </MessageWrapper>
        );
    }
}