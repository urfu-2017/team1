import React from 'react';

import PropTypes from 'prop-types';

import { getChatName } from '../../utils/chats';

import SelectContactsList from '../selectContactsList';

import { Header } from '../../styles/messages';
import { GroupChatWrapper } from '../../styles/groupChat';

export default class GroupChatEdit extends React.Component {
    static propTypes = {
        chat: PropTypes.shape(),
        contacts: PropTypes.arrayOf(PropTypes.shape()),
        setGroupChatEditorState: PropTypes.func
    }

    state = {
        name: getChatName(this.props.chat)
    }

    onChangeHandler(e) {
        this.setState({ name: e.target.value.trim() });
    }

    render() {
        const { setGroupChatEditorState, contacts, chat } = this.props;
        const userInChatIds = chat.contacts.map(c => c.userId);
        const filteredContacts = contacts.filter(contact => {
            return !userInChatIds.includes(contact.userId);
        });
        return (<GroupChatWrapper>
            <div>
                <Header className="group-chat-header">
                    <div className="group-chat-header__button button--left" 
                        onClick={() => { setGroupChatEditorState(null); }}>Назад</div>
                    <div className="group-chat-header__button">Редактирование чата</div>
                    <div className="group-chat-header__button done--right"
                        onClick={() => { }}>Сохранить</div>
                </Header>
                <div>
                    <input
                        type="text"
                        placeholder="Имя чата"
                        className="group-chat__input"
                        value={this.state.name}
                        onChange={e => { this.onChangeHandler(e); }}
                    />
                </div>
                <SelectContactsList ref={scl => { this.scl = scl; }} contacts={filteredContacts} />
            </div>
        </GroupChatWrapper>);
    }
}