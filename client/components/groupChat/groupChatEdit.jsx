import React from 'react';

import PropTypes from 'prop-types';

import { getChatName } from '../../utils/chats';

import { Scrollbars } from 'react-custom-scrollbars';

import SelectContactsList from '../selectContactsList';

import { Header } from '../../styles/messages';
import { GroupChatWrapper } from '../../styles/groupChat';

export default class GroupChatEdit extends React.Component {
    static propTypes = {
        serverURL: PropTypes.string,
        chat: PropTypes.shape(),
        contacts: PropTypes.arrayOf(PropTypes.shape()),
        setGroupChatEditorState: PropTypes.func,
        editChat: PropTypes.func
    }

    state = {
        name: getChatName(this.props.chat)
    }

    onChangeHandler(e) {
        this.setState({ name: e.target.value });
    }

    onKeyPressHandler(e) {
        if (e.which === 13) {
            e.preventDefault();
            this.save();
        }
    }

    save() {
        const { editChat, chat } = this.props;
        editChat(chat, this.state.name.trim(), this.scl.state.selectedIds);
    }

    render() {
        const { setGroupChatEditorState, contacts, chat, serverURL } = this.props;
        const usersInChat = [];
        const candidates = [];
        const userInChatIds = chat.contacts.map(c => c.userId);

        for (let contact of contacts) {
            if (userInChatIds.includes(contact.userId)) {
                usersInChat.push(contact);
            } else {
                candidates.push(contact);
            }
        }

        const inviteLink = `${serverURL}/invite/${chat._id}`;

        return (<GroupChatWrapper>
            <div>
                <Header className="group-chat-header">
                    <div className="group-chat-header__button button--left" 
                        onClick={() => { setGroupChatEditorState(null); }}>Назад</div>
                    <div className="group-chat-header__button">Редактирование чата</div>
                    <div className="group-chat-header__button done--right"
                        onClick={() => { this.save(); }}>Сохранить</div>
                </Header>
                <div>
                    <input
                        type="text"
                        placeholder="Имя чата"
                        className="group-chat__input"
                        value={this.state.name}
                        onChange={e => { this.onChangeHandler(e); }}
                        onKeyPress={e => { this.onKeyPressHandler(e); }}
                    />
                </div>
                <div className="invite-container">Ссылка на добавления в чат: <span className="invite-container__link">{inviteLink}</span></div>
                <div>
                    <div className="group-chat-edit__label">Пользователи в чате</div>
                    <Scrollbars universal style={{ 'minHeight': '200px' }}>
                        <SelectContactsList ref={scl => { this.scl = scl; }} selectedIds={userInChatIds} contacts={usersInChat} />
                    </Scrollbars>
                </div>
                <div>
                    <div className="group-chat-edit__label">Добавить пользователей</div>
                    <Scrollbars universal style={{ 'minHeight': '400px' }}>
                        <SelectContactsList ref={scl => { this.scl = scl; }} selectedIds={userInChatIds} contacts={candidates} />
                    </Scrollbars>
                </div>
            </div>
        </GroupChatWrapper>);
    }
}