import React from 'react';
import PropTypes from 'prop-types';
import {withApollo} from 'react-apollo';
import {Scrollbars} from 'react-custom-scrollbars';

import LoadScreen from '../ui/loadScreen';
import MessageInput from './messageInput';
import ReplyPreview from './messageInput/replyPreview';
import Message from './Message';
import ForwardPlate from './Forwarding/plate';
import {messagesSubscriptionDataHandler} from '../../graphql/dataHandlers';
import {MessagesList, ScrollButton} from '../../styles/messages';
import {SubscribeToMessages} from '../../graphql/subscriptions';
import {withUiTheme} from '../../lib/withUiTheme';
import MessagesController from './messagesController';


@withUiTheme
@withApollo
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

    constructor(props) {
        super(props);

        this.messagesController = new MessagesController(props.client, () => this.state);
    }

    state = {
        citedMessage: null,
        selectedMessages: new Map(),
        selectedMessagesDummy: ''
    };

    // действие "ответить на сообщение" называет данное сообщение "цитируемым"
    replyToMessage = (message = null) => {
        this.setState({ citedMessage: message });
    };

    selectMessage = message => this.setState(prev => {
        this.replyToMessage(null);
        const alreadySelected = prev.selectedMessages.has(message.id);
        alreadySelected ?
            prev.selectedMessages.delete(message.id) :
            prev.selectedMessages.set(message.id, message);
        return { selectedMessagesDummy: '' };
    });

    clearMessagesSelection = () => {
        this.state.selectedMessages.clear();
        this.setState({ selectedMessagesDummy: '' });
    };

    componentDidMount() {
        this.scroll.isBottom = true;
        this.scroll.scrollToBottom();
    }

    componentDidUpdate() {
        if (this.scroll.isBottom) {
            this.scroll.scrollToBottom();
        }
    }

    changePositionScroll = () => {
        this.scroll.isBottom =
            (this.scroll.getScrollHeight() === this.scroll.getScrollTop() + this.scroll.getClientHeight());
    };

    // Не создаём новую функцию при каждом рендере
    setScroll = node => (this.scroll = node);

    getMessages = (messages, forwardedBy) => {
        const res = [];
        for (const message of messages) {
            if (message.forwardedMessages && message.forwardedMessages.length > 0) {
                res.push(...this.getMessages(message.forwardedMessages, message.sender));
            } else {
                res.push(
                    <Message
                        key={message.id}
                        message={message}
                        isFromSelf={message.sender.id === this.props.currentUserId}
                        replyToMessage={this.replyToMessage}
                        selectMessage={this.selectMessage}
                        forwardedBy={forwardedBy}
                        selected={this.state.selectedMessages.has(message.id)}
                    />);
            }
        }
        return res;
    };

    render() {
        const {
            loading, error, messages, currentChatId,
            currentUserId, uiTheme: { isNightTheme }
        } = this.props;

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
                    {this.getMessages(messages)}
                </React.Fragment>
            );
            // Сообщения получены и отрисованы.
            // Значит, можно подписываться на обновления
            this.subscribe();
        }
        return (
            <React.Fragment>
                <Scrollbars
                    style={{ 'background-color': isNightTheme ? '##212121' : '' }}
                    ref={this.setScroll}
                    onScrollStop={this.changePositionScroll}
                >
                    <MessagesList>
                        {content}
                    </MessagesList>
                </Scrollbars>
                {this.state.citedMessage &&
                <ReplyPreview message={this.state.citedMessage} resetReply={this.replyToMessage}/>}
                {this.state.selectedMessages.size > 0 &&
                <ForwardPlate
                    messages={this.state.selectedMessages}
                    messagesController={this.messagesController}
                    cancel={this.clearMessagesSelection}/> ||
                <MessageInput
                    currentChatId={currentChatId}
                    currentUserId={currentUserId}
                    messagesController={this.messagesController}
                    citedMessage={this.state.citedMessage}
                    resetReply={this.replyToMessage}
                    updateMessages={this.props.data.updateQuery}/>}
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

    static LoadScreen = <LoadScreen offsetPercentage={100} opacity={1}/>;

    static ErrorScreen = <p>Encountered unknown error while loading messages :(</p>;
}
