import React from 'react';
import PropTypes from 'prop-types';

import Message from '../message/message';
import css from './messages.css';

export default class Messages extends React.Component {
    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.object)
    }

    static defaultProps = { messages: [] }

    componentDidUpdate = () => { this.node.scrollTop = this.node.scrollHeight; }

    getSectionRef = node => { this.node = node; }

    getMessagesList() {
        const { messages } = this.props;
 
        return messages.map(currentMessage => (
            <Message
                key={currentMessage.id}
                message={currentMessage.content}
                creationTime={currentMessage.createAt}
            />
        ));
    }

    render() {
        return (
            <React.Fragment>
                <section ref={this.getSectionRef} className={css.messages}> 
                    {this.getMessagesList()}
                </section>
            </React.Fragment>
        );
    }
}

