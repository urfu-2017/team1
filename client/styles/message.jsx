import styled from 'styled-components';

export const MessageWrapper = styled.article`
    background: #fff;
    height:auto;
    padding: 10px;
`;

export const Text = styled.p`
    float: ${props => (props.from === 'me' ? 'right' : 'left')};
    max-width: 70%;
    width: fit-content;
    word-wrap: break-word;
    height:auto;
    min-height: 18px;
    background-color: ${props => (props.from === 'me' ? '#92d7ef' : '#a2eae0')};
    border-radius: 5px;
    padding: 6px 4px 6px 6px;
`;

export const Time = styled.time`
    padding: 2px;
    font-size: 0.8em;
`;
