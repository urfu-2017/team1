import styled from 'styled-components';
import { withUiTheme } from '../lib/withUiTheme';

export const MenuRoot = withUiTheme(styled.section`
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-left: 2px solid ${props => props.uiTheme.isNightTheme ? '#424242' : 'lavender'};
    background:  ${props => props.uiTheme.isNightTheme ? '#212121' : '#fff'};
    .profile {
        background: #5682a3;
        padding: 5px;
        display: flex;
        align-items: center;
    }
    .profile__name {
        color: #fff;
        margin-left: 15px;
    }
    .profile__avatar {
        border-radius: 5px;
        width: 64px;
        height: 64px;
    }
    .menu__item
    {
        background: lavender;
        margin: 0;
        padding: 15px 0 15px 20px;
        cursor: default;
        &:hover {
           background: #b7c5f5;
        }
    }
    .header {
        color: #fff;
        height: 18px;
    }
    .button {
        outline:none;
        cursor: pointer;
        padding: 7px 15px;
        border-radius: 5px;
        background: lavender;
        color: #000;
        margin: 0 auto;
        margin-bottom: 20px;
    }    
`);
