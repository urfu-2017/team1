import React from 'react';
import PropTypes from 'prop-types';
import {Mutation} from 'react-apollo';

import ContactsList from './contactsList';
import {GetUserChats} from '../graphqlQueries/queries';
import {CreateChat} from '../graphqlQueries/mutations';
import withLocalState from '../lib/withLocalState';
import {getTitleForPersonalChat} from '../lib/dataHandlers';


const getNewChat = (currentUser, contact) => ({
    title: getTitleForPersonalChat(currentUser.id, contact.id),
    picture: '',
    ownerId: currentUser.id,
    user1: currentUser.id,
    user2: contact.id
});


@withLocalState
export default class Contacts extends React.Component {
    clickHandler = (createChat, currentUser, contact) => {
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
                        this.setActiveChat(createChat.id);
                    }
                }
            >{
                createChat => (
                    <ContactsList
                        title="Контакты"
                        clickHandler={this.clickHandler.bind(this, createChat)}
                        contactsFilter={({ currentUser }, contact) => contact.id !== currentUser.id}
                    />
                )
            }</Mutation>
        );
    }
}
