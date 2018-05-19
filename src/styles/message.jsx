import styled from 'styled-components';
import { withUiTheme } from '../lib/withUiTheme';


export const MessageWrapper = withUiTheme(styled.article`
    z-index: ${props => (props.emojiPickerVisible ? '20' : '0')};
    position: relative;
    height:auto;
    padding: 10px;
    background: ${props => props.selected ? props.uiTheme.isNightTheme ? '#555555' : '#e8f0fd' : 'transparent'};
    p {
        display: table; 
        white-space: pre-wrap;
        margin: 3px;
    }
    p * {
        margin: 0;
        width: 100%;
        line-height: initial;
        background-size: contain;
    }
    .messageBlock {
        z-index: 10;
        max-width: 51%;
        min-width: 340px;
        border-radius: 5px;
        min-height: 25px;
        height:auto;
        color: ${props => (props.uiTheme.isNightTheme ? '#EEE' : props.isFromSelf ? '#fff' : '#454648')};
        position: relative;
        left: ${props => (props.isFromSelf ? 'calc(100% - 10px)' : '0')};
        transform: ${props => (props.isFromSelf ? 'translateX(-100%);' : '0')};
        box-shadow: ${props => props.uiTheme.isNightTheme ? '#546E7A' :'rgb(200, 217, 230)'} 2px 2px 5px 0px;
        background-color: ${props => props.uiTheme.isNightTheme ? '#607D8B' : (props.isFromSelf ?  '#92d7ef' : 'rgb(231, 235, 240)')};
    }
    .messageBlock__forwarded-from {
        font-weight: bold;
        cursor: pointer;
    }
    .messageBlock__header {
        flex-wrap: wrap;
        display: flex;
        width: 100%;
        border-bottom: 1px solid ${props => props.uiTheme.isNightTheme ? '#CFD8DC' : '#b7efe7'};
    }
    .msgFromBlock {
        padding: 8px;
        display: flex;
        height: 40px;
        justify-content: end;
        align-items: center;
    }
    .mood {
        cursor: pointer;
        color: ${props => (props.uiTheme.isNightTheme ? '#EEE' : props.isFromSelf ? '#fff' : '#454648')} !important;
    }
    .messageBlock__citation {
        border-left: 2px solid ${props => props.uiTheme.isNightTheme ? '#CFD8DC' : '#b7efe7'};
        padding-left: 5px;
        margin: 2px 0 0 6px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .messageBlock__citation-text {
        white-space: nowrap;
    }
    .messageBlock__citation-sender {
        font-weight: bold;
    }
    .messageBlock__citation-picture {
        max-width: 15%;
        margin-right: 5px;
    }
    .messageBlock__citation-map {
        max-width: 15%;
        margin-right: 5px;
    }
    .messageBlock__citation-wrapper {
        display: flex;
        align-items: center;
    }
    .messageBlock__citation a {
        text-decoration: none;
        color: ${props => props.uiTheme.isNightTheme || props.isFromSelf ? '#fff' : '#454648'};
    }
    .addReactions {
        background-image: url('/static/images/happy.svg');
        background-repeat: no-repeat;
        width: 20px;
        height: 20px;
        padding: 0 5px;
        cursor: pointer;
    }
    .msgFromUserName {
        margin: 5px;
        color: ${props => (props.uiTheme.isNightTheme ? '#EEE' : props.isFromSelf ? '#fff' : '#454648')};
    }
    .msgTimeReactionBlock {
        align-items: center;
        display: flex;
        justify-content: space-between;
    }
    .msgFromUserPic {
        padding: 8px;
        width: 40px;
        height: 40px;
        border-radius: 50% 50%;
        object-fit: cover;
    }
    .messageBlock__text {
        white-space: pre-wrap;
        width: fit-content;
        word-wrap: break-word;
        word-break: break-word;
        padding: 6px 4px 6px 6px;
    }
    .messageBlock__time {
        color: ${props => (props.uiTheme.isNightTheme ? '#EEE' : props.isFromSelf ? '#fff' : '#454648')};
        padding: 0 11px;
        font-size: 0.8em;
    }
    .messageBlock__reply {
        color: ${props => (props.isFromSelf || props.uiTheme.isNightTheme ? '#fff' : '#454648')};
        padding: 0 11px;
        font-size: 0.8em;
        cursor: pointer;
        align: right;
    }
    .messageBlock__reply:hover {
        text-decoration: underline;
    }
    .metadata {
        margin: 7px;
        border: 2px solid ${props => props.uiTheme.isNightTheme ? '#CFD8DC' : '#b7efe7'};
        background-color: #ffffff;
    }
    .metadata-container {
        padding: 8px;
        display: flex;
        color: ${props => props.uiTheme.isNightTheme ? '#0D47A1' : '#42648b'};
        align-items: center;
        text-decoration: none; 
    }
    .metadata-container__img {
        margin-left: 5%;
        padding-right: 8px;
        width: auto;
        height: auto;
        max-height: 65px;
    }
    .metadataBlock {
        padding: 0px 2px 5px 2px;
    }
    .info__siteName {
        color: ${props => (props.isFromSelf ? '#2499f6' : '#9a989f')};
    }
    .info__title {
        font-weight: 800;
    }
    .pickerStyle {
        z-index: 10;
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        @media screen and (max-width: 1260px) {
            right: ${props => (props.isFromSelf ? '' : '0')};
            left: ${props => (props.isFromSelf ? '35vw' : '')};
        }
        @media screen and (min-width: 1261px) {
            right: ${props => (props.isFromSelf ? '' : 'calc((100vw - 1260px) / 2)')};
            left: ${props => (props.isFromSelf ? 'calc((100vw - 1260px) / 2 + 441px)' : '')};
        }
    }
    .message__paranja {
        position: absolute;
        z-index: 3000;
        height: 100%;
        top: 0;
        right: 0;
        left: 0;
    }
    .messageBlock__picture {
        padding: 5%;
        object-fit: contain;
        align-self: center;
        width: 90%;
    }
    .messageBlock__map {
        height: 200px;
        margin: 5%;
        width: 90%;
        align-self: center;
        height: 200px;
        border: 1px solid red;
    }
`);
