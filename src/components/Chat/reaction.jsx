import React from 'react';

import PropTypes from 'prop-types';

import { ReactionWrapper } from '../../styles/reaction';

export default class Reaction extends React.Component {
    static propTypes = {
        reaction: PropTypes.string,
        count: PropTypes.number,
        isCurrentUser: PropTypes.bool,
        onReactionClick: PropTypes.func,
        emojiNative: PropTypes.string
    };

    static defaultProps = {
        isCurrentUser: false,
        count: 0
    }
    
    render() {
        const { reaction, count, isCurrentUser, onReactionClick, emojiNative } = this.props;
        const classes = ['reaction'];
        if (isCurrentUser) {
            classes.push('reaction-current');
        }

        return (<ReactionWrapper>
            <div className={classes.join(' ')} onClick={onReactionClick}> 
                <div className="reaction__emoji"/>
                    {emojiNative}
                <div className="reaction__count">{count}</div>
            </div>
        </ReactionWrapper>)
    }
}
