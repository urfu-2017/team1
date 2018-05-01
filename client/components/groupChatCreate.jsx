import React from 'react';

import PropTypes from 'prop-types';

import ChangedInput from './changedInput';
import SelectContactsList from './selectContactsList';

import { Header } from '../styles/messages';
import { GroupChatCreateWrapper } from '../styles/groupChat';

export default class GroupChatCreate extends React.Component { // eslint-disable-line

    static propTypes = {
        contacts: PropTypes.arrayOf(PropTypes.shape()),
        setGroupChatEditorState: PropTypes.func,
        createGroupChat: PropTypes.func
    }

    constructor() {
        super();
        this.state = {
            name: 'Новый чат'
        };
    }

    onChangeHandler(e) {
        this.setState({ name: e.target.value.trim() });
    }

    createChat() {
        const { createGroupChat } = this.props;
        const { selectedIds } = this.scl.state;
        const name = this.state.name.trim();
        if (selectedIds.length > 0 && name.trim()) {
            createGroupChat(name, selectedIds);
        }
    }

    render() {
        const { contacts, setGroupChatEditorState } = this.props;
        return (<GroupChatCreateWrapper>
            <div>
                <Header className="group-chat-create-header">
                    <div className="group-chat-create-header__button button--left" 
                        onClick={() => { setGroupChatEditorState(false) }}>Назад</div>
                    <div className="group-chat-create-header__button">Создание чата</div>
                    <div className="group-chat-create-header__button button--right"
                        onClick={() => { this.createChat() }}>Создать</div>
                </Header>
                <div>
                    <input
                        type="text"
                        placeholder="Имя чата"
                        className="group-chat-create__input"
                        value={this.state.name}
                        onChange={(e) => { this.onChangeHandler(e); }}
                    />
                    <SelectContactsList ref={scl => { this.scl = scl; }} contacts={contacts} />
                </div>
            </div>
        </GroupChatCreateWrapper>);
    }
};
