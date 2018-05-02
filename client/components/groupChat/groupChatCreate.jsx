import React from 'react';

import PropTypes from 'prop-types';

import { Scrollbars } from 'react-custom-scrollbars';

import SelectContactsList from '../selectContactsList';

import { Header } from '../../styles/messages';
import { GroupChatWrapper } from '../../styles/groupChat';

export default class GroupChatCreate extends React.Component {
    static propTypes = {
        contacts: PropTypes.arrayOf(PropTypes.shape()),
        setGroupChatCreatorState: PropTypes.func,
        createGroupChat: PropTypes.func
    }

    constructor() {
        super();
        this.state = {
            name: 'Новый чат'
        };
    }

    componentDidMount() {
        this.scl.state.selectedIds = [];
    }

    onChangeHandler(e) {
        this.setState({ name: e.target.value });
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
        const { contacts, setGroupChatCreatorState } = this.props;
        return (<GroupChatWrapper>
            <div>
                <Header className="group-chat-header">
                    <div className="group-chat-header__button button--left" 
                        onClick={() => { setGroupChatCreatorState(false) }}>Назад</div>
                    <div className="group-chat-header__button">Создание чата</div>
                    <div className="group-chat-header__button button--right"
                        onClick={() => { this.createChat() }}>Создать</div>
                </Header>
                <div>
                    <input
                        type="text"
                        placeholder="Имя чата"
                        className="group-chat__input"
                        value={this.state.name}
                        onChange={(e) => { this.onChangeHandler(e); }}
                    />
                    <Scrollbars universal style={{ 'min-height': '600px' }}>
                        <SelectContactsList ref={scl => { this.scl = scl; }} contacts={contacts} />
                    </Scrollbars>
                </div>
            </div>
        </GroupChatWrapper>);
    }
};
