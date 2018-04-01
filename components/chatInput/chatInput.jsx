import React from 'react';
import PropTypes from 'prop-types';
import css from './chatInput.css';

export default class ChatInput extends React.Component {
    static propTypes = {
        onSend: PropTypes.func
    }

    static defaultProps = { onSend: {} }

    constructor(props) {
        super(props);
        this.state = { message: '' };
    }

    handleChange = event => { this.setState({ message: event.target.value }); }
    handleSubmit = event => {
        event.preventDefault();
        this.props.onSend(this.state.message);
        this.setState({ message: '' });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Введите сообщение"
                    className={css['creator-message']}
                    value={this.state.message}
                    required
                />
            </form>
        );
    }
}
