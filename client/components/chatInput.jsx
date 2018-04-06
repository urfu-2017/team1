import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import io from 'socket.io-client';

import { connect } from 'react-redux';

import { addMessage } from '../actions/actions';


const Input = styled.input`
    width: 100%;
    height: 60px;

    box-sizing: border-box;
`;

class ChatInput extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    }

    static defaultProps = { dispatch: {} }

    constructor(props) {
        super(props);
        this.state = { message: '' };
    }

    componentDidMount() {
        this.socket = io('http://localhost:3000/');
        this.socket.on('now', data => {
            const message = {
                id: 3,
                content: data.message,
                createAt: '12:09'
            };
            this.props.dispatch(addMessage({ content: { text: message, from: 'me' } }));
            this.setState({ message: '' });
        });
    }

    componentWillUnmount() {
        this.socket.off('now');
        this.socket.close();
    }

    handleChange = event => { this.setState({ message: event.target.value }); }

    handleSubmit = event => {
        event.preventDefault();
        this.props.dispatch(addMessage({ content: { text: this.state.message, from: 'me' } }));
        this.setState({ message: '' });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Input
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Введите сообщение"
                    value={this.state.message}
                    required
                />
            </form>
        );
    }
}

export default connect()(ChatInput);

