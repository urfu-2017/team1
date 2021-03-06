import styled from 'styled-components';
import { withUiTheme } from '../lib/withUiTheme';
import {grey50, grey200} from 'material-ui/styles/colors';


export const clearStyles = {
    width: 25,
    height: 25,
    color: grey50
};

export const searchStyles = {
    color: grey50,
    borderColor: grey50
};

export const searchHintStyles = {
    borderColor: grey200,
    color: grey200
};

export const Header = styled.header`
    height: 49px;
    background: ${props => !props.isNightTheme ? '#5682a3' : '#37474F'};
    display: flex;
    align-items: center;
    justify-content: space-around;
    .header__menu-icon {
        cursor: pointer;
        color: #fff;
    }
`;

export const ChatsList = withUiTheme(styled.section`
    width: 35%;
    min-width: 250px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-right: 1.5px solid ${props => !props.uiTheme.isNightTheme ? 'lavender' : '#424242' };
    border-left: 1.5px solid ${props => !props.uiTheme.isNightTheme ? 'lavender' : '#424242' };
    .menuHeader {
        min-height: 59px;
        max-height: 59px; 
    }
    .menuHeader__search {
        display: flex;
        margin: auto;
        align-items: center;
        width: 100%;
    }
    .menuHeader__clear {
        margin-left: -35px !important;
        color: #fff !important;
    }
`);

export const Paranja = styled.section`
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    background: rgba(0,0,0,.2);
    max-width: 1248px;
`;

export const Contacts = styled.section`
    width: 340px;
    height: 400px;
    overflow: hidden;
    border: 1px solid
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #f2f3de;
    .contacts__list {
        width: 360px;
        height: 400px;
        overflow-y: scroll;
    }
`;

export const Contact = styled.div`
    display: flex;
    width: 100%;
    height: 40px;
    cursor: default;
    margin: 10px 0;
    .contact__image {
        width: 35px;
        height: 35px;
        border 1px solid;
        margin: 0 15px;
    }
`;

