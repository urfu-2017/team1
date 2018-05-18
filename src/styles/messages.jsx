import styled from 'styled-components';
import { withUiTheme } from '../lib/withUiTheme';


export const MessagesList = withUiTheme(styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    .messageForwarded__animation {
        animation: light 5s 1 ease-in;
    }
    @keyframes light {
        from {
            background: ${props => !props.uiTheme.isNightTheme ? '#e7ebf0' : '#616161'};
        }
        to {
            background: ${props => (props.uiTheme.isNightTheme ? '#212121' : '#fff')};
        }
    }
`);

export const Header = withUiTheme(styled.section`
    position: relative;
    min-height: 58px;
    max-height: 58px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${props=> props.searchOpened ? 'space-around' : 'center'};
    color: #fff;
    background: ${props => !props.uiTheme.isNightTheme ? '#5682a3' : '#37474F'};
    .header__editor {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .header__img {
        margin: 0 15px 0 0 !important;
        color: #fff !important;
    }
    .search {
        color: #fff !important; 
    }
    .search__icon {
        right: 0;
        position: absolute;
        margin: 0 10px 0;
        color: #fff !important;
    }
    .header__buttons {
        min-width: 220px;
        max-width: 220px;
        display: flex;
        justify-content: space-around;
    }
`);

export const ScrollButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 0;
    margin-bottom: 10px;
    width: 30px;
    height: 30px;
    border: 2px solid #b7c5f5;
    border-radius: 50%;
    color: #b7c5f5;
    position: fixed;
    bottom: 50px;
    z-index: 6000;
    @media screen and (max-width: 1260px) {
        right: 50px;
    }
    @media screen and (min-width: 1261px) {
        right: calc((100vw - 1260px) / 2 + 50px);
    }
    cursor: pointer;
    &::before {
        content: '▼';
        font-weight: 900;
        font-size: 20px;
    }
`;


export const ReplyPreview = styled.div`
    padding: 10px 20px 5px 40px;
    z-index: 5000;
    background: #fff;
    position: relative;
    max-width: 100%;
    
    .replyPreview__sender {
        font-weight: bold;
        margin: 0;
    }
    
    .replyPreview__message {
        width: 95%;
        margin: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .replyPreview__map {
        max-width: 5%;
        margin: 0 5px;
    }
    
    .replyPreview__picture {
        max-width: 5%;
        margin: 0 5px;
    }
    .replyPreview__wrapper {
        margin-left: -25px;
        display: flex;
        align-items: center;
    }
    
    .replyPreview__close-button {
        position: absolute;
        top: 5px;
        right: 10px;
        cursor: pointer;
    }
`;
