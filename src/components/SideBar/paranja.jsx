import React from 'react';
import PropTypes from 'prop-types';

import Menu from './menu';
import { ParanjaWrapper } from '../../styles/paranja';


export default class Paranja extends React.Component {
    static propTypes = {
        currentUser: PropTypes.object,
        toggleParanja: PropTypes.func,
        mainComponentChanger: PropTypes.func
    };

    static defaultProps = {
        currentUser: {}
    };

    render() {
        const { currentUser, toggleParanja, mainComponentChanger, isNightTheme } = this.props;

        return (
            <ParanjaWrapper onClick={toggleParanja}>
                <Menu
                    isNightTheme={isNightTheme}
                    currentUser={currentUser}
                    mainComponentChanger={mainComponentChanger}
                />
            </ParanjaWrapper>
        );
    }
}
