import styled from 'styled-components';


export const MessageWrapper = styled.article`
    z-index: ${props => (props.emoji ? '20' : '0')};
    height:auto;
    padding: 10px;
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
        max-width: 51%;
        min-width: 338px;
        border-radius: 5px;
        min-height: 25px;
        height:auto;
        position: relative;
        left: ${props => (props.isFromSelf ? 'calc(100% - 10px)' : '0')};
        transform: ${props => (props.isFromSelf ? 'translateX(-100%);' : '0')};
        box-shadow: rgb(200, 217, 230) 2px 2px 5px 0px;
        background-color: ${props => (props.isFromSelf ? '#92d7ef' : 'rgb(231, 235, 240)')};
    }
    .msgFromBlock {
        padding: 8px;
        display: flex;
        height: 40px;
        justify-content: end;
        align-items: center;
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
        color: ${props => (props.isFromSelf ? '#fff' : '#454648')};
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
    }
    .messageBlock__text {
        white-space: pre-wrap;
        width: fit-content;
        word-wrap: break-word;
        word-break: break-word;
        padding: 6px 4px 6px 6px;
    }
    .messageBlock__time {
        color: ${props => (props.isFromSelf ? '#fff' : '#454648')};
        padding: 0 11px;
        font-size: 0.8em;
    }
    .metadata {
        margin: 7px;
        border: 2px solid #b2ebff;
        background-color: #ffffff;
    }
    .metadata-container {
        padding: 8px;
        display: flex;
        color: #42648b;
        align-items: center;
        text-decoration: none; 
    }
    .metadata-container__img {
        flex-basis: 100%;
        padding-right: 8px;
        max-width: 178px;
        width: auto;
        height: auto;
    }
    .pickerStyle {
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
    .messageBlock__picture {
        padding: 5%;
        object-fit: contain;
        align-self: center;
        width: 90%;
    }
`;
