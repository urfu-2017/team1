import {UpdateMessageReactions} from '../../../graphqlQueries/mutations';


export default class ReactionsController {
    constructor(apolloClient, currentUserId, messageId, reactions) {
        this.apolloClient = apolloClient;
        this.currentUserId = currentUserId;
        this.messageId = messageId;
        this.reactions = reactions;
    }

    addReaction = emoji => {
        const { currentUserId, messageId, reactions, apolloClient } = this;
        const updatedReactions = ReactionsController.getNewReactions(reactions, emoji, currentUserId);
        apolloClient.mutate({
            mutation: UpdateMessageReactions.mutation,
            variables: {
                messageId,
                reactions: updatedReactions
            }
        });
        this.reactions = updatedReactions;
    };

    static getNewReactions = (reactions, emoji, currentUserId) => {
        let reactionsCopy = JSON.parse(JSON.stringify(reactions));
        if (reactionsCopy === null) {
            return [{
                emoji,
                users: [currentUserId]
            }];
        }

        let reaction = reactionsCopy.find(x => x.emoji === emoji);
        if (!reaction) {
            const newReaction = {
                emoji,
                users: [currentUserId]
            };
            return [...reactions, newReaction];
        }

        if (!reaction.users.includes(currentUserId)) {
            reaction.users.push(currentUserId);
        } else {
            if (reaction.users.length === 1) {
                return reactionsCopy.filter(x => x.emoji !== emoji);
            } else {
                reaction.users = reaction.users.filter(x => x !== currentUserId);
            }
        }

        return reactionsCopy;
    }
}

