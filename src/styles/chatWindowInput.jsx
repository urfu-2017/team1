import styled from 'styled-components';

import { pulse } from './pulse';
import {withUiTheme} from '../lib/withUiTheme';




export const Input = withUiTheme(styled.div`
    width: 100%;

    border-top: 1px solid ${props => props.uiTheme.isNightTheme ? '#424242' : '#e7ebf0'};
    .forward-plate {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        margin: 0 5px;
    }
`);


export const Textarea = withUiTheme(styled.div`
    background: ${props => props.uiTheme.isNightTheme ? '#37474F' : ''};
    .picker__style {
        position: absolute;
        bottom: 60px;
        right: 30px;
        background: #b7c5f5;
        border-radius: 5px;
        cursor: pointer;
    }

    .inputField__style {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 50px;
    }
    .pulse {
        border-radius: 50% !important;
        animation: ${pulse} 2s linear infinite;
        background-color: #5682a3 !important;
    }

    .icon {
        padding: 4px;
        width: 24px !important;
        height: 24px !important;
    }

    .textarea__style {
        height: 45px;
        border: none;
        border-right: 1.5px solid #e7ebf0;
        width: 97%;
        resize: none;
        border: none;
        outline: none;
        padding: 16px 0 0 16px;
        box-sizing: border-box;
        display: inline-block;
        color: ${props => props.uiTheme.isNightTheme ? '#fff' : '#000'};
        background: ${props => props.uiTheme.isNightTheme ? '#37474F' : '#fff'};
    }

    .closeEmojiButton__style {
        cursor: pointer;
        display: inline-block;
        width: 20px;
        margin-left: 170px;
    }

    .openEmojiButton__style {
        cursor: pointer;
        display: inline-block;
        font-size: 25px;
        vertical-align: top;
    }

    .emoji__style {
        padding: 5px;
        cursor: pointer;
    }

    .clip {
        cursor: pointer;
        display: inline-block;
        margin: 10px 0;
        width: 25px;
        text-align: center;
        vertical-align: top;
    }
`);
