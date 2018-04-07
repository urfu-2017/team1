import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MessageWrapper = styled.article`
    display: flex;
    align-items: flex-end;
    align-self: ${props => (props.from === 'me' ? 'flex-end' : 'flex-start')};
    justify-content: space-between;
    
    margin: 6px 4px;
    border-radius: 5px;
    background-color: ${props => (props.from === 'me' ?  '#a3bad2' : '#dbe4ed') };
    font: 14px;
    
    max-width: 50%;
    min-width: 25%;
    width: max-content;
    word-wrap: break-word;
`;

const Text = styled.p`
    margin: 0;
    padding: 6px 4px 6px 6px;
`;

const Time = styled.time`
    padding: 2px;
    font-size: 0.8em;
`;

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
