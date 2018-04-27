import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';

import LoadScreen from '../ui/loadScreen';
import MessageInput from './messageInput';
import ScrollButton from './scrollButton';
import Message from './message';
import {MessagesList} from '../../styles/messages';
import {GetChatMessages} from '../../graphqlQueries/queries';
import {SubscribeToMessages} from '../../graphqlQueries/subscriptions';


@graphql(
    GetChatMessages.query,
    {
        name: 'data',
        skip: ({ currentChatId }) => !currentChatId,
        options: ({ currentChatId }) => ({
            variables: { chatId: currentChatId }
        }),
        props: GetChatMessages.map
    }
)
export default class Messages extends React.Component {
    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.object),
        currentUserId: PropTypes.string,
        currentChatId: PropTypes.string,
        loading: PropTypes.bool,
        error: PropTypes.bool,
        data: PropTypes.object
    };

    static defaultProps = {
        messages: [],
        currentUserId: '',
        currentChatId: '',
        loading: true,
        error: false,
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
                    currentUserId={currentUserId}/>
            </React.Fragment>
        );
    }

    // Компонент не перемонтируется при переключении чатов
    // Поэтому, чтобы подписаться на все открытые чаты, нужно иметь словарь
    subscriptions = {};

    subscribe = () => {
        const { currentChatId, data } = this.props;
        if (!this.subscriptions[currentChatId]) {
            this.subscriptions[currentChatId] = data.subscribeToMore({
                document: SubscribeToMessages.subscription,
                variables: SubscribeToMessages.vars(currentChatId),
                updateQuery: Messages.subscriptionDataHandler
            });
        }
    };

    static subscriptionDataHandler = (previousResult, { subscriptionData, variables }) => {
        if (!previousResult.Chat) {
            return previousResult;
        }
        const { mutation, node } = subscriptionData.data.Message;
        let messages = [...previousResult.Chat.messages];
        switch (mutation) {
            case 'CREATED':
                messages = messages.concat([node]);
                break;
            case 'UPDATED':
                const index = messages.find(msg => msg.id === node.id);
                if (index !== undefined) {
                    messages[index] = node;
                }
                break;
            case 'DELETED':
                messages = messages.filter(msg => msg.id !== node.id);
                break;
        }
        return { Chat: { ...previousResult.Chat, messages } };
    };

    static addNewMessage = (message, target) => {
        target.push(message);
        return target;
    };

    static LoadScreen = <LoadScreen offsetPercentage={50} opacity={1} />;
    static ErrorScreen = <p>Encountered unknown error while loading messages :(</p>;
}
