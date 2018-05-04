import React from 'react';
import PropTypes from 'prop-types';
import {graphql, Mutation} from 'react-apollo';
import {Scrollbars} from 'react-custom-scrollbars';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';

import {GetChatMembers, GetUserContacts} from '../../graphqlQueries/queries';
import {AddUserToChat} from '../../graphqlQueries/mutations';
import {Editor, AddButton, UserList, Contact} from '../../styles/chatEditor';
import ContactsList from '../contactsList';
import {withCurrentUser} from '../../lib/currentUserContext';
import ChatImageSender from './chatImageSender';
import {UpdateChatPicture} from '../../graphqlQueries/mutations';


@withCurrentUser
@graphql(GetChatMembers.query, {
    options: ({ currentChat }) => ({ variables: { chatId: currentChat.id } }),
    props: GetChatMembers.map
})
@graphql(GetUserContacts.query, {
    skip: ({ currentUser }) => !currentUser,
    options: ({ currentUser }) => ({ variables: { userId: currentUser.id } }),
    props: GetUserContacts.map
})
@graphql(UpdateChatPicture.mutation, { props: UpdateChatPicture.map })
export default class ChatEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { usersListOpened: false };
    }

    getMembersList() {
        const { members } = this.props;

        return members
            .map(user => (
                <ListItem
                    key={user.id}
                    primaryText={user.name}
                    rightAvatar={<Avatar src={user.avatarUrl}/>}
                />
            ));
    }

    clickHandler = (addUserToChat, currentUser, contact) => {
        const { currentChat, data } = this.props;
        addUserToChat({ variables: { chatId: currentChat.id, userId: contact.id } });
        setTimeout(data.refetch, 700);
        this.toggleUsersList();
    };

    contactsFilter = (_, contact) => !this.props.members.find(u => u.id === contact.id);

    usersList = () => (
        <Mutation mutation={AddUserToChat.mutation}>{
            addUserToChat => <ContactsList
                title="Добавить пользователя в чат"
                clickHandler={this.clickHandler.bind(null, addUserToChat)}
                contactsFilter={this.contactsFilter}
                closeAction={this.toggleUsersList}
                contacts={this.props.contacts}
                loading={this.props.loading}
                error={this.props.error}
            />
        }</Mutation>
    );

    toggleUsersList = () => this.props.members &&
        this.setState(prev => ({ usersListOpened: !prev.usersListOpened }));

    getImageUploadWindow = () => {
        return (this.state.uploadWindow) ?
            (<ChatImageSender onSendImage={this.onSendImage}
                              closeImageSender={this.openOrCloseChatImageUploadWindow}/>) : '';
    };

    onSendImage = (urlInBase64) => {
        this.props.updateChatPicture({
            chatId: this.props.currentChat.id,
            picture: urlInBase64
        });
    };

    openOrCloseChatImageUploadWindow = () => {
        this.setState({ uploadWindow: !this.state.uploadWindow });
    };

    render() {
        const { currentChat, members } = this.props;

        return (
            <Editor>
                <Paper zDepth={3}/>
                {this.state.usersListOpened && members
                    ? this.usersList()
                    : <React.Fragment>
                        <img className="image" onClick={this.openOrCloseChatImageUploadWindow} src={currentChat.picture}
                             alt="Изображение чата"/>
                        <div className="chat-editor">
                            <h1 className="chat-editor__header">{currentChat.title}</h1>
                            <AddButton
                                type="button"
                                value="Добавить пользователя"
                                onClick={this.toggleUsersList}
                            />
                        </div>
                        <dl className="link">
                            <dt>Инвайт</dt>
                            <dd><a href={`/invite/${currentChat.id}`}>/invite/{currentChat.id}</a></dd>
                        </dl>
                        <UserList>
                            <Scrollbars universal>
                                <List>
                                    {members && this.getMembersList()}
                                </List>
                            </Scrollbars>
                        </UserList>
                        {this.getImageUploadWindow()}
                    </React.Fragment>
                }</Editor>
        );
    }
}
