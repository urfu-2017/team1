import styled from 'styled-components';

export const ChatWrapper = styled.article`
    background-color: ${props => (props.select ? '#b7c5f5' : '#f2f3dE')};
    margin: 4px 0;
    padding: 4px 25px;
    display:flex;
    flex-direction: row;
`;

export const Sender = styled.i`
    margin: 0 5px 0 0; 
`;

export const LastMessage = styled.p`
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
