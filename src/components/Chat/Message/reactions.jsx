import React from 'react';
import {emojiIndex} from 'emoji-mart';

import {ReactionWrapper, Reactions} from '../../../styles/reaction';


const findEmoji = id => emojiIndex.search(id)
    .filter(x => x.id === id)
    .map(x => x.native);


const Reaction = ({ reaction, isCurrentUser, onReactionClick, emojiNative, count = 0 }) => {
    const classes = ['reaction'];
    if (isCurrentUser) {
        // TODO: doesn't work
        classes.push('reaction-current');
    }

    return (
        <ReactionWrapper>
            <div className={classes.join(' ')} onClick={onReactionClick}>
                <div className="reaction__emoji"/>
                {emojiNative}
                <div className="reaction__count">{count}</div>
            </div>
        </ReactionWrapper>
    );
};


export default class extends React.Component {
    constructor(props) {
        super(props);
    }
    onReactionClick = emoji => {
        this.props.addReaction(emoji);
    };

    render() {
        const { currentUserId, reactions } = this.props;
        return reactions.length &&
            <Reactions>
                {reactions.map(r => (
                    <Reaction
                        key={r.emoji}
                        count={r.users.length}
                        isCurrentUser={r.users.includes(currentUserId)}
                        reaction={r.emoji}
                        onReactionClick={event => event.stopPropagation() || this.onReactionClick(r.emoji)}
                        emojiNative={findEmoji(r.emoji)}
                    />
                ))}
            </Reactions>;
    }
}
