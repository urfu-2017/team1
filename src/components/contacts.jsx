import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Mutation, Query, graphql} from 'react-apollo';

import ContactsList from './contactsList';
import {tabStyle, InnerBlockStyle, ItemContainerStyle} from '../styles/contacts';
import {GetUserChats, GetUserContacts, GetAllUsers} from '../graphql/queries';
import {AddUserToContacts, CreateChat} from '../graphql/mutations';
import withLocalState from '../lib/withLocalState';
import {idXor} from '../lib/idXor';
import {withCurrentUser} from '../lib/currentUserContext';


const getNewChat = (currentUser, contact) => ({
    title: idXor(currentUser.id, contact.id),
    picture: '',
    ownerId: currentUser.id,
    user1: currentUser.id,
    user2: contact.id
});


@withLocalState
@withCurrentUser
@graphql(GetUserContacts.query, {
    name: 'data',
    skip: ({ currentUser }) => !currentUser,
    options: ({ currentUser }) => ({ variables: { userId: currentUser.id } }),
    props: GetUserContacts.map
})
export default class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showAllUsers: false };
    }

    toggleAllUsers = () => this.setState(prev => ({ showAllUsers: !prev.showAllUsers }));

    render() {
        const { showAllUsers } = this.state;
        return (
            <Tabs
                style={tabStyle}
                tabTemplateStyle={InnerBlockStyle}
                contentContainerStyle={InnerBlockStyle}
                tabItemContainerStyle={ItemContainerStyle}
                value={showAllUsers ? 'allUsers' : 'contacts'}
                onChange={this.toggleAllUsers}
            >
                <Tab
                    label="Контакты"
                    value="contacts"
                    style={tabStyle}
                >
                    {showAllUsers || this.withCreateChat(this.myContactsTab)}

                </Tab>
                <Tab
                    label="Все пользователи"
                    value="allUsers"
                    style={tabStyle}>
                    {showAllUsers && this.withCreateChat(this.withAddToContacts(this.allUsersTab))}
                </Tab>
            </Tabs>
        );
    };

    /*
     * Contacts
     */

    contactClickHandler = (createChat, currentUser, contact) => {
        const existingChat = currentUser.chats
            .find(chat => !chat.groupchat && chat.members.find(u => u.id === contact.id));
        if (existingChat) {
            this.setActiveChat(existingChat.id);
        } else {
            const newChat = getNewChat(currentUser, contact);
            createChat({
                variables: { ...newChat },
                optimisticResponse: CreateChat.optimisticResponse(currentUser, contact)
            });
        }
    };

    setActiveChat = chatId => {
        const { updateCurrentChatId, mainComponentChanger } = this.props;
        updateCurrentChatId(chatId);
        mainComponentChanger('Chat')();
    };

    filterCurrentUser = ({ currentUser }, contact) => contact.id !== currentUser.id;

    updateAfterChatCreation = (cache, { data: { currentUser, createChat } }) => {
        cache.writeQuery({
            query: GetUserChats.query,
            data: { User: { ...currentUser } },
            variables: { userId: currentUser.id }
        });
        this.setActiveChat(createChat.id);
    };

    withCreateChat = Inner =>
        <Mutation
            mutation={CreateChat.mutation}
            update={this.updateAfterChatCreation}
        >{
            createChat => <Inner createChat={createChat} />
        }</Mutation>;

    myContactsTab = ({ createChat }) => {
        const { loading, error, contacts } = this.props;

        return <ContactsList
            title="Начать чат:"
            clickHandler={this.contactClickHandler.bind(this, createChat)}
            contactsFilter={this.filterCurrentUser}
            {...{ loading, error, contacts }}
        />;
    };

    /*
     * All users
     */

    filterContacts = ({ currentUser }, contact) => (
        this.filterCurrentUser({ currentUser }, contact) &&
        !this.props.contacts.find(user => user.id === contact.id)
    );

    userClickHandler = (createChat, addUserToContacts, currentUser, contact) => {
        addUserToContacts({ variables: { userId1: currentUser.id, userId2: contact.id } });
        this.contactClickHandler(createChat, currentUser, contact);
    };

    updateAfterAdditionToContacts = (cache, { data: { currentUser, otherUser } }) => {
        const user = cache.readQuery({
            query: GetUserContacts.query,
            variables: {
                userId: currentUser.id
            }
        });
        const contacts = [...user.User.contacts];
        contacts.push(otherUser);
        cache.writeQuery({
            query: GetUserContacts.query,
            data: { User: { ...user.User, contacts } },
            variables: { userId: currentUser.id }
        });
        this.toggleAllUsers();
    };

    withAddToContacts = Inner => ({ createChat }) => (
        <Query query={GetAllUsers.query} fetchPolicy='network-only'>{
            response =>
                <Mutation
                    mutation={AddUserToContacts.mutation}
                    update={this.updateAfterAdditionToContacts}
                >{
                    addUserToContacts =>
                        <Inner {...{ addUserToContacts, createChat, ...GetAllUsers.map(response) }} />
                }</Mutation>
        }</Query>
    );

    allUsersTab = ({ addUserToContacts, createChat, allUsers, loading, error }) => (
        <ContactsList
            title="Добавить в контакты:"
            contactsFilter={this.filterContacts}
            clickHandler={this.userClickHandler.bind(this, createChat, addUserToContacts)}
            contacts={allUsers}
            {...{ loading, error }} />
    );
}
