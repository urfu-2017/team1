import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';

import {withCurrentUser} from '../../lib/currentUserContext';
import Textarea from '../../styles/chatWindowInput';
import {addNewMessage} from './manageMessages';
import {CreateMessage} from '../../graphqlQueries/mutations';
import {GetChatMessages} from '../../graphqlQueries/queries';


@withCurrentUser
@graphql(CreateMessage.mutation, { props: CreateMessage.map })
export default class MessageInput extends React.PureComponent {
    static propTypes = {
        currentChatId: PropTypes.string,
        currentUserId: PropTypes.string,
        updateMessages: PropTypes.func
    };

    static defaultProps = {
        currentChatId: '',
        currentUserId: '',
        updateMessages: () => {
        }
    };

    constructor(props) {
        super(props);
        this.state = { message: '' };
    }

    handleSubmit = event => {
        if (this.state.message.trim().length === 0) {
            return;
        }  // TODO: review later
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            const message = this.getMessage();
            // Что это? О_о
            // const cursorInBottom = cursorIsPressedFromBelow();

            this.props.createMessage(message, {
                optimisticResponse: this.optimisticResponse(message),
                update: this.updateCache
            });

            // if (cursorInBottom) {
            //     moveCursorDown();
            // }

            this.clearState();
        }
    };

    getMessage = () => ({
        text: this.state.message,
        chatId: this.props.currentChatId,
        senderId: this.props.currentUserId,
        pictures: []
    });

    clearState = () => {
        this.setState({ message: '' });
    };

    optimisticResponse = message => ({
        __typename: 'Mutation',
        createMessage: {
            id: -Math.floor(Math.random() * 1000),
            createdAt: (new Date()).toISOString(),
            modifiedAt: null,
            sender: {
                id: this.props.currentUserId,
                __typename: 'User'
            },
            ...message,
            __typename: 'Message',
        }
    });

    updateCache = (cache, { data: { createMessage } }) => {
        const variables = { chatId: this.props.currentChatId };
        const data = cache.readQuery({
            query: GetChatMessages.query,
            variables
        });
        const updated = addNewMessage(createMessage, data);
        cache.writeQuery({ query: GetChatMessages.query, data: updated });
        this.props.updateMessages((_, { variables }) => updated);
    };

    handleChange = event => this.setState({ message: event.target.value });

    render() {
        return (
            <Textarea>
                <textarea
                    className="textarea__style"
                    onKeyPress={this.handleSubmit}
                    onChange={this.handleChange}
                    placeholder="Сообщение..."
                    value={this.state.message}
                    required/>
            </Textarea>
        );
    }
}
