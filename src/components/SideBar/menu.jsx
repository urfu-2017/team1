import React from 'react';
import PropTypes from 'prop-types';
import { MenuRoot } from '../../styles/menu';


export default class Menu extends React.Component {
    static propTypes = {
        currentUser: PropTypes.shape(),
        mainComponentChanger: PropTypes.func
    };

    static defaultProps = {
        currentUser: {}
    };

    render() {
        const { currentUser, mainComponentChanger } = this.props;
        return (
            <MenuRoot>
                <div className="profile" onClick={mainComponentChanger('Profile')}>
                    <img
                        alt="Изображение аватарки"
                        className="profile__avatar"
                        src={currentUser.avatar}
                    />
                    <div className="profile__name">{currentUser.name}</div>
                </div>
                <main>
                    <p
                        role="presentation"
                        className="menu__item"
                        onClick={mainComponentChanger('Contacts')}
                    >
                        Контакты
                    </p>
                    <p
                        role="presentation"
                        className="menu__item"
                        onClick={mainComponentChanger('Profile')}
                    >
                        Редактирование профиля
                    </p>
                </main>
            </MenuRoot>
        );
    }
}
