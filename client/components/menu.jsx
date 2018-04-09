import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const MenuRoot = styled.section`
    width: 25%;
    height: 100%;
    background: #f2f3dE;
    .profile {
        padding: 5px;
        display: flex;
        align-items: center;
    }
    .profile__name {
        margin-left: 15px;
    }
    .profile__avatar {
        width: 64px;
        height: 64px;
    }
`;

export default class Menu extends React.Component {
    render() {
        const { user } = this.props;
        return <MenuRoot>
            <div className="profile">
                <img className="profile__avatar" src={user.avatar} />
                <div className="profile__name">{ user.name }</div>
            </div>
        </MenuRoot>
    }
}