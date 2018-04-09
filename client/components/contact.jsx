import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import { ContactWrraper, ContactHeader, LastMessage, Sender } from '../styles/contact';

import { addMessageFromSocket } from '../actions/actions';

class Contact extends React.Component {
    static propTypes = {
        contact: PropTypes.object,
        select: PropTypes.bool,
        onClick: PropTypes.func,
        dispatch: PropTypes.func,
        currentUserId: PropTypes.string
    }

    static defaultProps = { contact: {}, select: false, onClick: {}, dispatch: {}, currentUserId: null };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.socket = io('http://localhost:3000/');
        this.socket.on(`now-${this.props.chatId}`, data => {
            const { currentUserId } = this.props;
            const message = {
                content: {
                    text: data.message
                },
                chatId: this.props.chatId,
                from: data.userId
            };
            this.props.dispatch(addMessageFromSocket(message, currentUserId));

        });
    }

    componentWillUnmount() {
        this.socket.off('now');
        this.socket.close();
    }

    render() {
        const { onClick, contact, select } = this.props;
        return (
            <ContactWrraper onClick={onClick} select={select}>
                <ContactHeader>{contact.title}</ContactHeader>
                <LastMessage>
                    <Sender>{contact.lastMessage.sender.name}:</Sender>
                    <span>{contact.lastMessage.content.text}</span>
                </LastMessage>
            </ContactWrraper>
        );
    }
}

export default connect()(Contact);
