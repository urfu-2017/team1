import React from 'react';
import PropTypes from 'prop-types';

import LoadScreen from '../ui/loadScreen';
import MessageInput from './messageInput';
import ScrollButton from './scrollButton';
import Message from './message';
import {messagesSubscriptionDataHandler} from '../../lib/dataHandlers';
import {MessagesList} from '../../styles/messages';
import {SubscribeToMessages} from '../../graphqlQueries/subscriptions';


export default class Messages extends React.Component {
    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.object),
        currentUserId: PropTypes.string,
        currentChatId: PropTypes.string,
        loading: PropTypes.bool,
        error: PropTypes.object,
        data: PropTypes.object
    };

    static defaultProps = {
        messages: [],
        currentUserId: '',
        currentChatId: '',
        loading: true,
        error: null,
        data: {}
    };

    componentDidMount() {
        this.node.scrollTop = this.node.scrollHeight;
    }

    componentWillUpdate() {
        this.shouldScrollBottom = this.node.scrollTop +
            this.node.offsetHeight === this.node.scrollHeight;
    }

    componentDidUpdate() {
        if (this.shouldScrollBottom) {
            this.node.scrollTop = this.node.scrollHeight;
        }
    }

    // Не создаём новую функцию при каждом рендере
    getSectionRef = node => (this.node = node);

    Message = message =>
        <Message
            key={message.id}
            message={message}
            isFromSelf={message.sender.id === this.props.currentUserId}/>;

    render() {
        const { loading, error, messages, currentChatId, currentUserId } = this.props;
        let content = null;
        if (loading) {
            content = Messages.LoadScreen;
        } else if (error) {
            content = Messages.ErrorScreen;
        } else {
            content = (
                <React.Fragment>
                    <ScrollButton scrollStepInPx="50" delayInMs="16.66"/>
                    {messages.map(this.Message)}
                </React.Fragment>
            );
            // Сообщения получены и отрисованы.
            // Значит, можно подписываться на обновления
            this.subscribe();
        }

        return (
            <React.Fragment>
                <MessagesList id="messages" ref={this.getSectionRef}>
                    {content}
                </MessagesList>
                <MessageInput
                    currentChatId={currentChatId}
                    currentUserId={currentUserId}
                    updateMessages={this.props.data.updateQuery} />
            </React.Fragment>
        );
    }

    subscription = null;

    subscribe = () => {
        const { currentChatId, currentUserId, data } = this.props;
        if (!this.subscription) {
            data.refetch();
            this.subscription = data.subscribeToMore({
                document: SubscribeToMessages.subscription,
                variables: SubscribeToMessages.vars(currentChatId, currentUserId),
                updateQuery: messagesSubscriptionDataHandler
            });
        }
    };

    static LoadScreen = <LoadScreen offsetPercentage={50} opacity={1} />;
    static ErrorScreen = <p>Encountered unknown error while loading messages :(</p>;
}