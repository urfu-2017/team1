import React from 'react';

import PropTypes from 'prop-types';
import emoji from 'node-emoji';

import { ReactionWrapper } from '../styles/reaction';

export default class Reaction extends React.Component {
    static propTypes = {
        reaction: PropTypes.string,
        count: PropTypes.number,
        isCurrentUser: PropTypes.bool
    };

    static defaultProps = {
        isCurrentUser: false,
        count: 0
    }
    
    render() {
        const { reaction, count, isCurrentUser } = this.props;
        const classes = [];
        if (isCurrentUser) {
            classes.push('reaction-current');
        }
        return (<ReactionWrapper className={classes.join(' ')}>
            <div className="reaction__emoji" dangerouslySetInnerHTML={{ __html: emoji.emojify(`:${reaction}:`) }} />
            <div className="reaction__count">{count}</div>
        </ReactionWrapper>)
    }
}
