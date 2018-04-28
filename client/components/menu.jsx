import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuRoot } from '../styles/menu';

export default class Menu extends Component {
    static propTypes = {
        user: PropTypes.shape(),
        setEvent: PropTypes.func,
        showContacts: PropTypes.func,
        showEditor: PropTypes.func
    }

    static defaultProps = {
        user: {},
        setEvent: () => {},
        showContacts: () => {},
        showEditor: () => {}
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { user, setEvent } = this.props;
        const { showContacts, showEditor, showAlarmClock } = this.props;
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
                        className="menu__item"
                        onClick={() => { showContacts(true); setEvent('addNewChat'); }}
                    >
                        Контакты
                    </p>
                    <p
                        role="presentation"
                        className="menu__item"
                        onClick={() => { showEditor(true); }}
                    >
                        Редактирование профиля
                    </p>
                    <p
                        role="presentation"
                        className="menu__item"
                        onClick={() => { showAlarmClock(true); }}
                    >
                        Будильник
                    </p>
                </main>
            </MenuRoot>
        );
    }
}
