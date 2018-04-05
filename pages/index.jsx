import React from 'react';
import io from 'socket.io-client';

import Messages from '../components/messages/messages';
import Contacts from '../components/contacts/contacts';

import ChatInput from '../components/chatInput/chatInput';

import css from './index.css';

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
    constructor(props) {
        super(props);
        this.state = {
            messages: [
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
            ]
        };
    }

    componentDidMount() {
        this.socket = io('http://localhost:3000/');
        this.socket.on('now', data => {
            const message = {
                id: 3,
                content: data.message,
                createAt: '12:09'
            };
            this.setState({
                messages: [...this.state.messages, message]
            });
        });
    }

    componentWillUnmount() {
        this.socket.off('now');
        this.socket.close();
    }

    addMessage = text => {
        const message = {
            id: 3,
            content: text,
            createAt: '12:09'
        };
        this.setState({ messages: [...this.state.messages, message] });
    }

    sendMessage = () => {
    }

    render() {
        return (
            <React.Fragment>
                <main className={css.chat}>
                    <Contacts contacts={constContacts} />
                    <section className={css.chat__main}>
                        <Messages messages={this.state.messages} />
                        <ChatInput onSend={this.addMessage} />
                    </section>
                </main>
            </React.Fragment>
        );
    }
}
