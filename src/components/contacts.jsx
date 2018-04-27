import React from 'react';
import PropTypes from 'prop-types';
import {graphql, compose, Mutation} from 'react-apollo';
import {Scrollbars} from 'react-custom-scrollbars';

import LoadScreen from './ui/loadScreen';
import {withCurrentUser} from '../lib/currentUserContext';
import {GET_USER_CONTACTS_ql} from '../graphqlQueries/queries';
import {GetUserChats} from '../graphqlQueries/queries';
import {CreateChat} from '../graphqlQueries/mutations';
import {
    Search,
    Contact,
    CloseButton,
    ContactsList,
    CreateButton,
    ContactsWrapper
} from '../styles/contacts';
import {UpdateCurrentChatId} from '../graphqlQueries/localState';


const getNewChat = (currentUser, contact) => ({
    title: `${contact.name} and ${currentUser.name}`,
    picture: contact.avatarUrl,
    ownerId: currentUser.id,
    user1: currentUser.id,
    user2: contact.id
});


@withCurrentUser
@compose(
    graphql(GET_USER_CONTACTS_ql, { name: 'contacts' }),
    graphql(UpdateCurrentChatId.query, {
        props: UpdateCurrentChatId.map
    })
)
export default class Contacts extends React.Component {
    static propTypes = {
        user: PropTypes.shape(),
        header: PropTypes.string,
        contacts: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        user: {},
        header: '',
        contacts: []
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    getContactsList() {
        const { contacts, currentUser } = this.props;
        if (contacts.loading) {
            return Contacts.LoadScreen;
        }
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
            >
                {createChat => {
                    return contacts.allUsers
                        .filter(contact => contact.id !== currentUser.id)
                        .map(contact => this.getContactsItem(currentUser, contact, createChat));
                }}
            </Mutation>
        );
    }

    getContactsItem = (currentUser, contact, createChat) => (
        <Contact
            key={contact.id}
            onClick={() => {
                const chat = getNewChat(currentUser, contact);
                createChat({ variables: { ...chat } });
            }}
        >
            <img src={contact.avatarUrl} alt="ава" className="contact__image"/>
            <p>{contact.name}</p>
        </Contact>
    );

    render() {
        const { header } = this.props;
        return (
            <ContactsWrapper>
                <h1 className="header"> {header} </h1>
                <Search
                    type="search"
                    placeholder="Поиск"
                />
                <ContactsList>
                    <Scrollbars universal>
                        {this.getContactsList()}
                    </Scrollbars>
                </ContactsList>
                <div className="buttons">
                    <CreateButton type="button" value="Создать"/>
                    <CloseButton type="button" value="Закрыть"/>
                </div>
            </ContactsWrapper>
        );
    }

    static LoadScreen = <LoadScreen offsetPercentage={30} opacity={0}/>;
    static ErrorScreen = <p>Error :(</p>;
}
