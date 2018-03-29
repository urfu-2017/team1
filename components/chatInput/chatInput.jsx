import React from 'react';

import css from './chatInput.css';

export default class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { message: '' };
    }
    render() {
        return (
          <form>
                <input
                    type="text"placeholder="Введите сообщение"
                    className={css['creator-message']}
                    value={this.state.message}
                />
            </form>
        );
    }
}
