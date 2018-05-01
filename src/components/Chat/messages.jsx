import React from 'react';
import PropTypes from 'prop-types';

import { Scrollbars } from 'react-custom-scrollbars';

import LoadScreen from '../ui/loadScreen';
import MessageInput from './messageInput';
import Message from './message';
import {messagesSubscriptionDataHandler} from '../../lib/dataHandlers';
import {MessagesList, ScrollButton } from '../../styles/messages';
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
        this.scroll.scrollToBottom();
    }

    componentWillUpdate() {
        this.scroll.scrollToBottom();
    }

    // Не создаём новую функцию при каждом рендере
    setScroll = node => (this.scroll = node);

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
                    <ScrollButton
                        type="button"
                        className="scroll"
                        onClick={() => this.scroll.scrollToBottom()}
                    />
                    {messages.map(this.Message)}
                </React.Fragment>
            );
            // Сообщения получены и отрисованы.
            // Значит, можно подписываться на обновления
            this.subscribe();
        }

        return (
            <React.Fragment>
                <Scrollbars
                    style={{ 'background-color': 'rgba(255,255,255, .7)' }}
                    ref={this.setScroll}
                >
                    <MessagesList >
                        {content}
                    </MessagesList>
                </Scrollbars>
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

    static LoadScreen = <LoadScreen offsetPercentage={500} opacity={1} />;
    static ErrorScreen = <p>Encountered unknown error while loading messages :(</p>;
}
