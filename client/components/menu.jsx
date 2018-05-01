import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuRoot } from '../styles/menu';

export default class Menu extends Component {
    static propTypes = {
        user: PropTypes.shape(),
        showContacts: PropTypes.func,
        setHeader: PropTypes.func,
        setProfileEditorState: PropTypes.func,
        setGroupChatCreatorState: PropTypes.func
    }

    static defaultProps = {
        user: {},
        showContacts: () => {},
        setHeader: () => {}
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { user, showContacts, setProfileEditorState, setGroupChatCreatorState, setHeader } = this.props;
        return (
            <MenuRoot>
                <div className="profile">
                    <img
                        alt="Изображение аватарки"
                        className="profile__avatar"
                        src={user.avatar}
                    />
                    <div className="profile__name">{user.name}</div>
                </div>
                <main>
                    <p
                        role="presentation"
                        className="menu__item contacts"
                        onClick={() => { showContacts(true); setHeader(' Контакты'); }}
                    >
                        Контакты
                    </p>
                    { <p
                        role="presentation"
                        className="menu__item createChat"
                        onClick={() => { setGroupChatCreatorState(true); }}
                     >
                        Создать чат
                    </p> }
                    <p
                        role="presentation"
                        className="menu__item editProfile"
                        onClick={() => { setProfileEditorState(true); }}
                    >
                        Редактирование профиля
                    </p>
                </main>
            </MenuRoot>
        );
    }
}
