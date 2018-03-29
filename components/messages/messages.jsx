import React from 'react';
import Message from '../message/message';
import css from './messages.css';

export default class Messages extends React.Component {
    render() {
        const messages = getMessagesList(this.props);
        return (
           <React.Fragment>
              <section className={css.messages}> { messages }</section>
            </React.Fragment>
        );
    }
}

function getMessagesList({ messages }) {
    return messages.map(currentMessage => (
        <Message
            key={currentMessage.id}
            message={currentMessage.content}
            creationTime={currentMessage.createAt}
        />
    ));
}
