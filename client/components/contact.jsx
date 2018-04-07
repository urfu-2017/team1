import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import { addMessage } from '../actions/actions';

const ContactWrraper = styled.article`
    height: 40px;
    width: 90%;
    display: flex;
    align-self: center;
    align-items: center;
    border: 1px solid #ccc;
`;

class Contact extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        onClick: PropTypes.func,
        dispatch: PropTypes.func
    }

    static defaultProps = { name: '', onClick: {}, dispatch: {} };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.socket = io('http://localhost:3000/');
        this.socket.on(`now-${this.props.chatId}`, data => {
            this.props.dispatch(addMessage({
                content: {
                    text: data.message
                },
                chatId: this.props.chatId,
                from: data.userId
            }));
        });
    }

    componentWillUnmount() {
        this.socket.off('now');
        this.socket.close();
    }

    render() {
        const { name, onClick } = this.props;
        return (
            <ContactWrraper onClick={onClick}>
                <p>{ name }</p>
            </ContactWrraper>
        );
    }
}

export default connect()(Contact);
