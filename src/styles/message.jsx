import styled from 'styled-components';


export const MessageWrapper = styled.article`
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
        border-radius: 5px;
        min-height: 25px;
        height:auto;
        float: ${props => (props.isFromSelf ? 'right' : 'left')};
        background-color: ${props => (props.isFromSelf ? '#92d7ef' : '#a2eae0')};
    }
    .messageBlock__text {
        white-space: pre-wrap;
        width: fit-content;
        word-wrap: break-word;
        word-break: break-word;
        padding: 6px 4px 6px 6px;
    }
    .messageBlock__time {
        padding: 2px;
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
        height: 78px;
    }
`;
