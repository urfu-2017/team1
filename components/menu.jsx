import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const MenuRoot = styled.section`
    width: 25%;
    height: 100%;
    background: #f2f3dE;
`;

export class Menu extends React.Component {
    static async getInitialProps(req) {
        console.log(req);
    }

    render() {
        return <MenuRoot>
            <div>{ this.props.user.username }</div>
        </MenuRoot>
    }
}