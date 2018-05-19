import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Mutation, Query, graphql} from 'react-apollo';

import ContactsList from './contactsList';
import {GetUserChats, GetUserContacts, GetAllUsers, GetLastMessageChatToUser} from '../graphql/queries';
import {AddUserToContacts, CreateChat, CreateChatAndUserLink} from '../graphql/mutations';
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
                style={{ width: "100%", background: "#fff" }}
                tabTemplateStyle={{ height: '100%' }}
                contentContainerStyle={{ height: '100%' }}
                tabItemContainerStyle={{ height: '60px' }}
                value={showAllUsers ? 'allUsers' : 'contacts'}
                onChange={this.toggleAllUsers}
            >
                <Tab
                    label="Контакты"
                    value="contacts"
                    style={{ width: "100%", background: "#5682a3" }}>
                    {showAllUsers || this.withCreateChat(this.myContactsTab)}

                </Tab>
                <Tab
                    label="Все пользователи"
                    value="allUsers"
                    style={{ width: "100%", background: "#5682a3" }}>
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
            style={{ background: "#fff" }}
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
            style={{ background: "#fff" }}
            title="Добавить в контакты:"
            contactsFilter={this.filterContacts}
            clickHandler={this.userClickHandler.bind(this, createChat, addUserToContacts)}
            contacts={allUsers}
            {...{ loading, error }} />
    );
}
