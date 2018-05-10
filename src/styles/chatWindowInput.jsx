import styled from 'styled-components';
import { withUiTheme } from '../lib/withUiTheme';

const Textarea = withUiTheme(styled.div`
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
        border-top: 1.5px solid ${props =>  props.uiTheme.isNightTheme ? '#424242': '#e7ebf0'};
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
    }
    .icon {
        padding: 10px;
    }

    .textarea__style {
        border: none;
        border-right: 1.5px solid #e7ebf0;
        width: 97%;
        resize: none;
        height: 45px;
        border: none;
        outline: none;
        padding: 16px 0 0 16px;
        box-sizing: border-box;
        display: inline-block;
        background: ${props =>  props.uiTheme.isNightTheme ? '#37474F' : '#fff'};
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

export default Textarea;
