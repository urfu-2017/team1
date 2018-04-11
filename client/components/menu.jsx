import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuRoot, Contacts } from '../styles/menu';


export default class Menu extends Component {
    render() {
        const { user, onClick } = this.props;
        return <MenuRoot>
            <div className="profile">
                <img className="profile__avatar" src={user.avatar} />
                <div className="profile__name">{user.name}</div>
            </div>
            <main>
                <p className="contacts" onClick={() => { onClick(true); }}>Контакты</p>
            </main>
        </MenuRoot>
    }
}
