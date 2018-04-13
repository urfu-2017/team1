import React, { Component } from 'react';
import { MenuRoot } from '../styles/menu';


export default class Menu extends Component {
    render() {
        const { user } = this.props;
        return <MenuRoot>
            <div className="profile">
                <img className="profile__avatar" src={user.avatar} />
                <div className="profile__name">{user.name}</div>
            </div>
        </MenuRoot>
    }
}
