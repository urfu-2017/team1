import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Mutation, Query, graphql} from 'react-apollo';

import ContactsList from './contactsList';
import {GetUserChats} from '../graphqlQueries/queries';
import {AddUserToContacts, CreateChat} from '../graphqlQueries/mutations';
import {withLocalState} from '../lib/withLocalState';
import {getTitleForPersonalChat} from '../lib/dataHandlers';
import {GetUserContacts, GetAllUsers} from '../graphqlQueries/queries';
import {withCurrentUser} from '../lib/currentUserContext';


const getNewChat = (currentUser, contact) => ({
    title: getTitleForPersonalChat(currentUser.id, contact.id),
    picture: '',
    ownerId: currentUser.id,
    user1: currentUser.id,
    user2: contact.id
});


const personalChatOptimisticResponse = (currentUser, contact) => {
    const id = -Math.floor(Math.random() * 1000);
    const chat = {
        id,
        title: contact.name,
        'private': false,
        picture: contact.avatarUrl,
        createdAt: (new Date()).toISOString(),
        groupchat: false,
        members: [currentUser, contact].map(
            ({ id, name, avatarUrl }) => ({ id, name, avatarUrl, __typename: 'User' })),
        __typename: 'Chat'
    };
    const updatedCurrentUser = {
        ...currentUser,
        chats: [...currentUser.chats].concat([chat])
    };
    return {
        __typename: 'Mutation',
        createChat: {
            id,
            __typename: 'Chat'
        },
        currentUser: {
            ...updatedCurrentUser,
            __typename: 'User'
        },
        contact: {
            id: contact.id,
            __typename: 'User'
        }
    };
};


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
                    {showAllUsers || this.withCreateChat(this.myContacts)}

                </Tab>
                <Tab
                    label="Все пользователи"
                    value="allUsers"
                    style={{ width: "100%", background: "#5682a3" }}>
                    {showAllUsers && this.withCreateChat(this.withAllUsers(this.allUsers))}
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
                optimisticResponse: personalChatOptimisticResponse(currentUser, contact)
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


    myContacts = ({ createChat }) => {
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

    withAllUsers = Inner => ({ createChat }) => (
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

    allUsers = ({ addUserToContacts, createChat, allUsers, loading, error }) => (
        <ContactsList
            style={{ background: "#fff" }}
            title="Добавить в контакты:"
            contactsFilter={this.filterContacts}
            clickHandler={this.userClickHandler.bind(this, createChat, addUserToContacts)}
            contacts={allUsers}
            {...{ loading, error }} />
    );
}
