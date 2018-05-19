import React from 'react';
import PropTypes from 'prop-types';
import {withApollo} from 'react-apollo';
import {Scrollbars} from 'react-custom-scrollbars';

import LoadScreen from '../ui/loadScreen';
import MessageInput from './MessageInput';
import ReplyPreview from './MessageInput/replyPreview';
import Message from './Message';
import ForwardPlate from './Forwarding/plate';
import {Input} from '../../styles/chatWindowInput';
import {messagesSubscriptionDataHandler} from '../../graphql/dataHandlers';
import {MessagesList, ScrollButton} from '../../styles/messages';
import {SubscribeToMessages} from '../../graphql/subscriptions';
import {withUiTheme} from '../../lib/withUiTheme';
import MessagesController from './messagesController';
import {idXor} from '../../lib/idXor';
import removeHashFromUrl from '../../lib/removeHashFromUrl';


@withUiTheme
@withApollo
export default class Messages extends React.Component {
    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.object),
        currentUserId: PropTypes.string,
        currentChatId: PropTypes.string,
        loading: PropTypes.bool,
        error: PropTypes.object,
        data: PropTypes.object,
        groupChat: PropTypes.bool
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
        selectedMessagesDummy: '',
        isBottom: true
    };

    // действие "ответить на сообщение" называет данное сообщение "цитируемым"
    replyToMessage = (message = null) => {
        message && this.clearMessagesSelection();
        this.setState({ citedMessage: message });
    };

    selectMessage = message => this.setState(prev => {
        this.replyToMessage(null);
        const alreadySelected = prev.selectedMessages.has(message.selectionId);
        alreadySelected ?
            prev.selectedMessages.delete(message.selectionId) :
            prev.selectedMessages.set(message.selectionId, message);
        return { selectedMessagesDummy: '' };
    });

    clearMessagesSelection = () => {
        this.state.selectedMessages.clear();
        this.setState({ selectedMessagesDummy: '' });
    };

    componentDidMount() {
        if (window.location.hash) {
            this.scrollToMessage();
        } else {
            this.state.isBottom = true;
            this.scroll.scrollToBottom();
        }
    }

    componentDidUpdate() {
        if (window.location.hash) {
            this.scrollToMessage();
        } else if (this.state.isBottom) {
            this.scroll.scrollToBottom();
        }
    }

    scrollToMessage = () => {
        const messageId = window.location.hash.slice(1);
        let messageWrapper = document.getElementById(messageId);
        if (!messageWrapper) {
            // при 1ой загрузке сообщения не загрузились
            return;
        }
        removeHashFromUrl();
        messageWrapper = messageWrapper.parentNode;
        messageWrapper.scrollIntoView(true);
        messageWrapper.classList.add('messageForwarded__animation');
        setTimeout(() => messageWrapper.classList.remove('messageForwarded__animation'), 5000);
    };

    bindedScrollToMessage = this.scrollToMessage.bind(this);

    changePositionScroll = () => {
        this.setState({
            isBottom: this.scroll.getScrollHeight() === this.scroll.getScrollTop() + this.scroll.getClientHeight()
        });
    };

    // Не создаём новую функцию при каждом рендере
    setScroll = node => (this.scroll = node);

    escapeRegExp = str => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

    getMessages = (messages, parent = null) => {
        const res = [];
        const {searchText} = this.props;
        for (const message of messages) {
            const isShow = new RegExp(this.escapeRegExp(searchText), 'gi').test(message.text) ||
                (message.citation && new RegExp(this.escapeRegExp(searchText), 'gi')
                    .test(message.citation.text));

            if (message.forwardedMessages && message.forwardedMessages.length > 0) {
                res.push(...this.getMessages(message.forwardedMessages, message));
            } else if (parent && isShow) {
                const forwardId = idXor(parent.id, message.id) + res.length;
                res.push(
                    <Message
                        key={forwardId}
                        hash={forwardId}
                        message={message}
                        isFromSelf={parent.sender.id === this.props.currentUserId}
                        replyToMessage={this.replyToMessage}
                        selectMessage={this.selectMessage}
                        forwardParent={parent}
                        selected={this.state.selectedMessages.has(forwardId)}
                        selectionId={forwardId}
                        currentChatId={this.props.currentChatId}
                        scrollToMessage={this.bindedScrollToMessage}
                    />);
            } else if (isShow) {
                res.push(
                    <Message
                        key={message.id}
                        hash={message.id}
                        message={message}
                        isFromSelf={message.sender.id === this.props.currentUserId}
                        replyToMessage={this.replyToMessage}
                        selectMessage={this.selectMessage}
                        selected={this.state.selectedMessages.has(message.id)}
                        selectionId={message.id}
                        currentChatId={this.props.currentChatId}
                        scrollToMessage={this.bindedScrollToMessage}
                    />);
            }
        }
        return res;
    };

    render() {
        const {
            loading, error, messages, currentChatId,
            currentUserId, uiTheme: { isNightTheme },
            groupChat
        } = this.props;

        let content = null;
        if (loading) {
            content = Messages.LoadScreen;
        } else if (error) {
            content = Messages.ErrorScreen;
        } else {
            content = (
                <React.Fragment>
                    {!this.state.isBottom &&
                        <ScrollButton
                            type="button"
                            className="scroll"
                            onClick={this.scroll.scrollToBottom}
                        />
                    }
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
                    style={{ 'background-color': isNightTheme ? '#212121' : '' }}
                    ref={this.setScroll}
                    onScrollStop={this.changePositionScroll}
                >
                    <MessagesList>
                        {content}
                    </MessagesList>
                </Scrollbars>
                <Input>
                    {this.state.citedMessage &&
                    <ReplyPreview message={this.state.citedMessage} resetReply={this.replyToMessage}/>}
                    {this.state.selectedMessages.size > 0 &&
                    <div className="forward-plate">
                        <ForwardPlate
                            messages={this.state.selectedMessages}
                            messagesController={this.messagesController}
                            cancel={this.clearMessagesSelection}/>
                    </div> ||
                    <MessageInput
                        currentChatId={currentChatId}
                        currentUserId={currentUserId}
                        messagesController={this.messagesController}
                        citedMessage={this.state.citedMessage}
                        resetReply={this.replyToMessage}
                        updateMessages={this.props.data.updateQuery}
                        groupChat={groupChat}/>}
                </Input>
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
