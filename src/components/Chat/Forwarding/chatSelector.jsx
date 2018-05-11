import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import ChatsList from '../../ChatsList/index';
import {withCurrentUser} from '../../../lib/currentUserContext';
import {CreateMessage, getClientSideId} from '../../../graphql/mutations';
import withLocalState from '../../../lib/withLocalState';


@withCurrentUser
@withLocalState
export default class ChatSelector extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.props.cancel();
    };

    handleChatClick = chat => {
        const { messagesController, updateCurrentChatId } = this.props;
        const message = this.getMessage(chat.id);
        const update = (...args) => CreateMessage.update(chat.id, ...args);
        messagesController.createMessage(message, update)
            .then(() => this.handleClose() || updateCurrentChatId(chat.id));
    };

    getMessage = chatId => ({
        clientSideId: getClientSideId(),
        text: '',
        chatId,
        senderId: this.props.currentUser.id,
        forwardedMessagesIds: [...this.props.messages.keys()]
    });

    actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.handleClose}
        />];

    render() {
        const { currentUser, messages } = this.props;

        return (
            <React.Fragment>
                <RaisedButton
                    label={`Переслать (${messages.size})`}
                    primary={true}
                    onClick={this.handleOpen}/>
                <Dialog
                    title="Выберите чат"
                    actions={this.actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <ChatsList
                        chats={currentUser.chats}
                        onChatClick={this.handleChatClick}
                    />
                </Dialog>
            </React.Fragment>
        );
    }
}
