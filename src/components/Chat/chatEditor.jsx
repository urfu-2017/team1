import React from 'react';
import PropTypes from 'prop-types';
import {graphql, Mutation} from 'react-apollo';
import {Scrollbars} from 'react-custom-scrollbars';

import {GetChatMembers} from '../../graphqlQueries/queries';
import {AddUserToChat} from '../../graphqlQueries/mutations';
import {Editor, AddButton, UserList, Contact} from '../../styles/chatEditor';
import ContactsList from '../contactsList';


@graphql(
    GetChatMembers.query,
    {
        options: ({ currentChat }) => ({ variables: { chatId: currentChat.id } }),
        props: GetChatMembers.map
    }
)
export default class ChatEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { usersListOpened: false };
    }

    getMembersList() {
        const { members } = this.props;

        return members
            .map(user => (<Contact key={user.id}>{user.name}</Contact>));
    }

    clickHandler = (addUserToChat, currentUser, contact) => {
        const { currentChat, data } = this.props;
        addUserToChat({ variables: { chatId: currentChat.id, userId: contact.id } });
        data.refetch();
        this.toggleUsersList();
    };

    usersList = () => (
        <Mutation mutation={AddUserToChat.mutation}>{
            addUserToChat => <ContactsList
                title="Добавить пользователя в чат"
                clickHandler={(...args) => this.clickHandler(addUserToChat, ...args)}
                contactsFilter={(_, contact) => !this.props.members.find(u => u.id === contact.id)}
                closeAction={this.toggleUsersList}
            />
        }</Mutation>
    );

    toggleUsersList = () => this.setState(prev => ({ usersListOpened: !prev.usersListOpened }));

    render() {
        const { currentChat, members } = this.props;

        return (
            <Editor>{
                this.state.usersListOpened
                    ? this.usersList()
                    : <React.Fragment>
                        <img className="image" src={currentChat.picture} alt="Изображение чата"/>
                        <div className="chat-editor">
                            <h1 className="chat-editor__header">{currentChat.title}</h1>
                            <AddButton
                                type="button"
                                value="Добавить пользователя"
                                onClick={this.toggleUsersList}
                            />
                        </div>
                        <UserList>
                            <Scrollbars universal>
                                {members && this.getMembersList()}
                            </Scrollbars>
                        </UserList>
                    </React.Fragment>
            }</Editor>
        );
    }
}
