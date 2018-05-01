import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';
import { Emoji, emojiIndex } from 'emoji-mart';

import {MessageWrapper} from '../../styles/message';
import {GetUser} from '../../graphqlQueries/queries';
import {UpdateMessageReactions} from '../../graphqlQueries/mutations'
import { Reactions } from '../../styles/reaction';
import Reaction from './reaction';
import { getNewReactions } from '../../helpers/reactionsHelper';

@graphql(
    GetUser.query,
    {
        options: ({ message: { sender } }) => ({
            variables: { userId: sender.id }
        }),
        props: GetUser.map
    }
)
@graphql(UpdateMessageReactions.mutation, { props: UpdateMessageReactions.map })
export default class Message extends React.PureComponent {
    static propTypes = {
        isFromSelf: PropTypes.bool,
        message: PropTypes.object,
        sender: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {};

        this.getReactions = this.getReactions.bind(this);
    }

    static defaultProps = { isFromSelf: false, message: {}, sender: {} };

    updateMessageReactions = (emoji) => {
        const currentUserId = this.props.user.id;
        let { id, reactions } = this.props.message;

        reactions = getNewReactions(reactions, emoji, currentUserId);

        this.props.updateMessageReactions({
            messageId: id,
            reactions
        });
    };

    getReactions = () => {
        const { messageId, chat, setReactionToMessage } = this.props;
        const { closeReactions } = this;
        const emojies = ['+1', '-1', 'ok_hand', 'heart'];
        return emojies.map(id => {
            return (
                <Emoji
                    key={id}
                    className="emoji__style"
                    onClick={() => {
                        this.updateMessageReactions(id);
                        this.closeReactions();
                    }}
                    emoji={{ id }}
                    size={25}
                />
            );
        });
    }

    openReactions = () => this.setState({ emoji: true });

    closeReactions = () => this.setState({ emoji: false });

    findEmoji = id => emojiIndex.search(id).map(o => o.native);

    getPicker = () => {
        let picker = '';
        if (this.state.emoji) {
            picker = (
                <div className="picker__style">
                    <span>
                        Выберите Реакцию
                    </span>
                    <div
                        className="closeEmojiButton__style"
                        onClick={this.closeReactions}
                        title="Скрыть"
                    >
                        &#x274C;
                    </div>
                    <hr />
                    <div>
                        {this.getReactions()}
                    </div>
                </div>
            );
        } else {
            picker = '';
        }
        return picker;
    }

    createReactionComponents = (reactions) => {
        let reactionComponents = [];

        if (reactions) {
            reactionComponents = reactions.map(x => (<Reaction key={Math.random()} 
            count={x.users.length} 
            isCurrentUser={x.users.includes(this.props.user.id)} 
            reaction={x.emoji}
            onReactionClick={() => this.updateMessageReactions(x.emoji)} />)); 
        }

        return reactionComponents;
    }

    static formatDate = new Intl.DateTimeFormat('ru', {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'long'
    }).format;

    render() {
        const { loading, error, message, user, isFromSelf } = this.props;
        // небольшой костыль: optimistic response присваивает сообщениям
        // рандомный отрицательный id, чтобы не хранить лишнее поле
        const delivered = isFromSelf ? (message.id < 0 ? '  ' : ' ✓') : '';
        const ogdata = message.metadata && message.metadata.ogdata || {};

        let reactionComponents = this.createReactionComponents(message.reactions);
        const createdAt = Message.formatDate(new Date(message.createdAt));

        return (
            <MessageWrapper isFromSelf={isFromSelf}>
                <div className="messageBlock">
                    <img src={user && user.avatarUrl} width="30px" />
                    <span>{user && user.name + delivered}</span>
                    {/*TODO: у сообщения есть также поле modifiedAt, равное null, если оно не менялось */}

                    <div onClick={this.openReactions} className="addReactions">
                            &#x263A;
                        </div>
                    <div className="messageBlock__time">{createdAt}</div>

                    <div
                        className="messageBlock__text"
                        isFromSelf={isFromSelf}
                        dangerouslySetInnerHTML={{ __html: message.text }}
                    />
                    {ogdata && ogdata.url && Object.keys(ogdata).length !== 0 &&
                    <div className="metadata">
                        <a href={ogdata.url} className="metadata-container">
                            { ogdata.image && <img className="metadata-container__img"
                                                   src={ogdata.image.url} alt={ogdata.title} /> }
                            <div className="metadata-container__title">{ogdata.title}</div>
                        </a>
                    </div>}
                    {reactionComponents.length > 0 && <Reactions>{reactionComponents}</Reactions>}
                </div>
                {this.getPicker()}
            </MessageWrapper>
        );
    }
}
