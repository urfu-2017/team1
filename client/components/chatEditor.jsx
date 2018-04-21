import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { Editor, AddButton, UserList, Contact } from '../styles/chatEditor';

export default class ProfileEditor extends Component {
    static propTypes = {
        contacts: PropTypes.arrayOf(PropTypes.object),
        showContacts: PropTypes.func,
        currentChat: PropTypes.shape(),
        setEvent: PropTypes.func
    };

    static defaultProps = {
        contacts: [],
        currentChat: {},
        setEvent: () => {},
        showContacts: () => {}
    };
    constructor(props) {
        super(props);
        this.state = {};
    }


    getMembersList() {
        const { currentChat, contacts } = this.props;
        const members = contacts
            .filter(user => currentChat.usersIds.includes(user.id))
            .map(user => (<Contact key={user.id}>{ user.name }</Contact>));

        return members;
    }

    render() {
        const {
            currentChat,
            showContacts,
            setEvent
        } = this.props;


        return (
            <Editor>
                <img className="image" src="" alt="Изображение чата" />
                <div className="chat-editor">
                    <h1 className="chat-editor__header">{ currentChat.title }</h1>
                    <AddButton
                        type="button"
                        value="Добавить пользователя"
                        onClick={() => { showContacts(true); setEvent('addUserInChat'); }}
                    />
                </div>
                <UserList>
                    <Scrollbars universal>
                        { this.getMembersList() }
                    </Scrollbars>
                </UserList>
            </Editor >
        );
    }
}
