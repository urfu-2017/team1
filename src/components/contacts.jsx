import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Mutation, Query, graphql} from 'react-apollo';

import ContactsList from './contactsList';
import {GetUserChats} from '../graphqlQueries/queries';
import {AddUserToContacts, CreateChat} from '../graphqlQueries/mutations';
import { withLocalState } from '../lib/withLocalState';
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
        this.state = { showAllUsers: false, value: 'contacts' };
    }
    handleChange = value => { this.setState({ value }); };
    contactClickHandler = (createChat, currentUser, contact) => {
        const existingChat = currentUser.chats
            .find(chat => !chat.groupchat && chat.members.find(u => u.id === contact.id));
        if (existingChat) {
            this.setActiveChat(existingChat.id);
        } else {
            const newChat = getNewChat(currentUser, contact);
            createChat({ variables: { ...newChat } });
        }
    };

    setActiveChat = chatId => {
        this.props.updateCurrentChatId(chatId);
        this.props.mainComponentChanger('Chat')();
    };

    withContacts = Inner => {
        const { loading, error, contacts } = this.props;
        return <Inner {...{ loading, error, contacts }} />;
    };

    currentUserFilter = ({ currentUser }, contact) => contact.id !== currentUser.id;

    myContacts = props => (
        <Mutation
            mutation={CreateChat.mutation}
            update={
                (cache, { data: { currentUser, createChat } }) => {
                    cache.writeQuery({
                        query: GetUserChats.query,
                        data: { User: { ...currentUser } },
                        variables: { userId: currentUser.id }
                    });
                    this.setActiveChat(createChat.id);
                }
            }
        >{
            createChat => (
                <ContactsList
                    style={{background: "#fff"}}
                    title="Начать чат:"
                    clickHandler={this.contactClickHandler.bind(this, createChat)}
                    contactsFilter={this.currentUserFilter}
                    {...props}
                />
            )
        }</Mutation>
    );

    withAllUsers = Inner => (
        <Query query={GetAllUsers.query}>
            {req => <Inner {...GetAllUsers.map(req)} />}
        </Query>
    );

    contactsFilter = ({ currentUser }, contact) => this.currentUserFilter({ currentUser }, contact) &&
        !this.props.contacts.find(u => u.id === contact.id);

    allUsers = ({ allUsers, loading, error }) => (
        <Mutation
            mutation={AddUserToContacts.mutation}
            update={
                (cache, { data: { currentUser, otherUser } }) => {
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
                    this.hideAllUsers();
                }
            }
        >{
            addUserToContacts => (
                <ContactsList
                    style={{background: "#fff"}}
                    title="Добавить в контакты:"
                    contactsFilter={this.contactsFilter}
                    handleChange={this.handleChange}
                    clickHandler={this.userClickHandler.bind(this, addUserToContacts)}
                    contacts={allUsers}
                    {...{ loading, error }} />
            )
        }</Mutation>
    );

    userClickHandler = (addUserToContacts, currentUser, contact) => {
        addUserToContacts({ variables: { userId1: currentUser.id, userId2: contact.id } });
    };

    showAllUsers = () => this.setState({ showAllUsers: true });

    hideAllUsers = () => this.setState({ showAllUsers: false });

    render() {
        // TODO: refactor this, PLEEEEEASE11111
        // console.log(this.state.value);

        return <React.Fragment>
            <Tabs
                style={{ width: "100%", background: "#fff" }}
                tabTemplateStyle={{ height: '100%' }}
                contentContainerStyle={{ height: '100%' }}
                tabItemContainerStyle={{ height: '60px' }}
                value={this.state.value}
                onChange={this.handleChange}
            >
                <Tab
                    label="Контакты"
                    value="contacts"
                    onActive={this.hideAllUsers}
                    style={{ width: "100%", background: "#5682a3" }} >
                    { !this.state.showAllUsers && this.withContacts(this.myContacts) }

                </Tab>
                <Tab
                    label="Все пользователи"
                    value="allUsers"
                    onActive={this.showAllUsers}
                    style={{ width: "100%", background: "#5682a3" }} >
                    { this.state.showAllUsers && this.withAllUsers(this.allUsers) }
                </Tab>
            </Tabs>
        </React.Fragment>;
    }
}
