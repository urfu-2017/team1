import React from 'react';

import Messages from '../components/messages/messages';
import Contacts from '../components/contacts/contacts';

import ChatInput from '../components/chatInput/chatInput';

import css from './index.css';

const constMessages = [
    {
        id: 1,
        content: 'Hello',
        createAt: '12:07'
    },
    {
        id: 2,
        content: '<strong>Текст</strong>',
        createAt: '12:08'
    }
];

const constContacts = [
    {
        id: 1,
        name: 'chat1',
        picture: 'picture',
        lastMessage: {
            id: 2,
            content: '<strong>Текст</strong>',
            createAt: '12:08'
        }
    },
    {
        id: 2,
        name: 'chat1',
        picture: 'picture',
        lastMessage: {
            id: 2,
            content: '<strong>Текст</strong>',
            createAt: '12:08'
        }
    }
];

export default class ChatApp extends React.Component {
    static async getInitialProps({ req }) {
        const { user } = req;
        return { user };
    }
    render() {
        return (
            <React.Fragment>
                <div>Hello {this.props.user.username}! Here was start page</div>
                <main className={css.chat}>
                    <Contacts contacts={constContacts} />
                    <section className={css.chat__main}>
                        <Messages messages={constMessages} />
                        <ChatInput />
                    </section>
                </main>
            </React.Fragment>
        );
    }
}
