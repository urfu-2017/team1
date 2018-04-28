import React from 'react';
import PropTypes from 'prop-types';
import {Mutation} from 'react-apollo';

import ContactsList from './contactsList';
import {GetUserChats} from '../graphqlQueries/queries';
import {CreateChat} from '../graphqlQueries/mutations';
import withLocalState from '../lib/withLocalState';


const getNewChat = (currentUser, contact) => ({
    title: `${contact.name} and ${currentUser.name}`,
    picture: contact.avatarUrl,
    ownerId: currentUser.id,
    user1: currentUser.id,
    user2: contact.id
});


@withLocalState
export default class Contacts extends React.Component {
    static clickHandler = (createChat, currentUser, contact) => {
        const chat = getNewChat(currentUser, contact);
        createChat({ variables: { ...chat } });
    };

    render() {
        // TODO: refactor this, PLEEEEEASE11111
        return (
            <Mutation
                mutation={CreateChat.mutation}
                update={
                    (cache, { data: { currentUser, createChat } }) => {
                        cache.writeQuery({
                            query: GetUserChats.query,
                            data: { User: { ...currentUser } },
                            variables: { userId: currentUser.id }
                        });
                        this.props.updateCurrentChatId(createChat.id);
                        this.props.mainComponentChanger('Chat')();
                    }
                }
            >{
                createChat => (
                    <ContactsList
                        title="Контакты"
                        clickHandler={
                            (...args) => Contacts.clickHandler(createChat, ...args)
                        }
                        contactsFilter={({ currentUser }, contact) => contact.id !== currentUser.id}
                    />
                )
            }</Mutation>
        );
    }
}
