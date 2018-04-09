import styled from 'styled-components';

export const ContactWrapper = styled.article`
    width: 90%;
    height: 50px;
    margin: 4px 0;
    padding: 0 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${props => (props.select ? '#b7c5f5' : '#f2f3dE')};
`;

export const ContactHeader = styled.p`
    margin: 0;
    font-weight: bold;
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
