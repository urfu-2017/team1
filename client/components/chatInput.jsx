import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from '../styles/chatInput';

import { addMessage } from '../actions/actions';

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

