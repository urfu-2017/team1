import React from 'react';

import PropTypes from 'prop-types';
import emoji from 'node-emoji';

import { ReactionWrapper } from '../../styles/reaction';

export default class Reaction extends React.Component {
    static propTypes = {
        reaction: PropTypes.string,
        count: PropTypes.number,
        isCurrentUser: PropTypes.bool,
        onReactionClick: PropTypes.func
    };

    static defaultProps = {
        isCurrentUser: false,
        count: 0
    }
    
    render() {
        const { reaction, count, isCurrentUser, onReactionClick } = this.props;
        const classes = ['reaction'];
        if (isCurrentUser) {
            classes.push('reaction-current');
        }
        return (<ReactionWrapper>
            <div className={classes.join(' ')} onClick={onReactionClick}>
                <div className="reaction__emoji" dangerouslySetInnerHTML={{ __html: emoji.emojify(`:${reaction}:`) }} />
                <div className="reaction__count">{count}</div>
            </div>
        </ReactionWrapper>)
    }
}
