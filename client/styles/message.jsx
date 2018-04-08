import styled from 'styled-components';

export const MessageWrapper = styled.article`
    display: flex;
    align-items: flex-end;
    align-self: ${props => (props.from === 'me' ? 'flex-end' : 'flex-start')};
    justify-content: space-between;
    
    margin: 6px 4px;
    border-radius: 5px;
    background-color: ${props => (props.from === 'me' ?  '#a3bad2' : '#dbe4ed') };
    font: 14px;
    
    max-width: 50%;
    min-width: 25%;
    width: max-content;
    word-wrap: break-word;
`;

export const Text = styled.p`
    margin: 0;
    padding: 6px 4px 6px 6px;
`;

export const Time = styled.time`
    padding: 2px;
    font-size: 0.8em;
`;
