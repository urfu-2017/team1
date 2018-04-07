import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { connect } from 'react-redux';

import { addMessage } from '../actions/actions';

const Input = styled.input`
    width: 100%;
    height: 45px;
    border: none;
    outline: none;
    padding: 0 0 0 25px;
    box-sizing: border-box;
    background-color: rgba(255,255,255,.7);
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

