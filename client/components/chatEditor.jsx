import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor, AddButton, UserList, Contact } from '../styles/chatEditor';

export default class ProfileEditor extends Component {
    static propTypes = {
        contacts: PropTypes.arrayOf(PropTypes.object),
        showContacts: PropTypes.func,
        currentChat: PropTypes.shape()
    };

    static defaultProps = {
        contacts: [],
        currentChat: {},
        showContacts: () => {}
    };
    constructor(props) {
        super(props);
        this.state = {};
    }
    getMembersList() {
        const { currentChat, contacts } = this.props;

        return contacts
            .filter(user => currentChat.usersIds.includes(user.id))
            .map(user => (<Contact key={user.id}>{ user.name }</Contact>));
    }

    render() {
        const { currentChat, showContacts } = this.props;
        return (
            <Editor>
                <img className="image" src="" alt="Изображение чата" />
                <div className="chat-editor">
                    <h1 className="chat-editor__header">{ currentChat.title }</h1>
                    <AddButton
                        type="button"
                        value="Добавить пользователя"
                        onClick={() => { showContacts(true); }}
                    />
                </div>
                <UserList>
                    { this.getMembersList() }
                </UserList>
            </Editor >
        );
    }
}
