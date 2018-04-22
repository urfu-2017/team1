import React from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';

import {withCurrentUser} from '../../lib/currentUserContext';
import {CreateMessage} from '../../graphqlQueries/messages';
import {GET_CURRENT_CHAT_ID_ql} from '../../graphqlQueries/localState';
import Textarea from '../../styles/chatWindowInput';


@withCurrentUser
@compose(
    graphql(GET_CURRENT_CHAT_ID_ql, { name: 'localState' }),
    graphql(CreateMessage.query, {
        props: CreateMessage.map,
        refetchQueries: ['GetChat']
    })
)
export default class MessageInput extends React.PureComponent {
    static propTypes = {
        currentChatId: PropTypes.string,
        currentUserId: PropTypes.string,
    };

    static defaultProps = {
        currentChatId: '',
        currentUserId: '',
    };

    constructor(props) {
        super(props);
        this.state = { message: '' };
    }

    handleChange = event => this.setState({ message: event.target.value });

    handleSubmit = event => {
        if (this.state.message.length === 0) {
            return;
        }  // TODO: review later
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            const currentChatId = this.props.localState.currentChatId;
            const currentUserId = this.props.currentUser.id;
            const message = {
                text: this.state.message,
                chatId: currentChatId,
                senderId: currentUserId,
                pictures: []
            };

            // Что это? О_о
            // const cursorInBottom = cursorIsPressedFromBelow();

            this.props.createMessage(message);

            // if (cursorInBottom) {
            //     moveCursorDown();
            // }

            this.setState({ message: '' });
        }
    };

    render() {
        return (
            <Textarea>
                <textarea
                    className="textarea__style"
                    onKeyPress={this.handleSubmit}
                    onChange={this.handleChange}
                    placeholder="Сообщение..."
                    value={this.state.message}
                    required
                />
            </Textarea>
        );
    }
}
