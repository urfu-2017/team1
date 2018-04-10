import styled from 'styled-components';

export const MessageWrapper = styled.article`
    height:auto;
    padding: 10px;
    p {
        margin: 3px;
        line-height: 0;
    }
    p * {
        margin: 0;
        width: 85%;
        line-height: initial;
        background-size: contain;
    }
`;

export const Text = styled.p`
    float: ${props => (props.fromMe ? 'right' : 'left')};
    max-width: 70%;
    white-space: pre;
    width: fit-content;
    word-wrap: break-word;
    height:auto;
    min-height: 18px;
    background-color: ${props => (props.fromMe ? '#92d7ef' : '#a2eae0')};
    border-radius: 5px;
    padding: 6px 4px 6px 6px;
`;

export const Time = styled.time`
    padding: 2px;
    font-size: 0.8em;
`;
