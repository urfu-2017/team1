import styled from 'styled-components';

export const ChatWrapper = styled.article`
    background-color: ${props => (props.select ? '#b7c5f5' : '#f2f3dE')};
    margin: 4px 0;
    padding: 4px 25px;
    display:flex;
    flex-direction: row;
    .chat-avatar {
        width: 50px;
        height: 50px;
    }
    .chat-avatar__img {
        margin-bottom: 4px;
        -webkit-border-radius: 50% 50%;
        -moz-border-radius: 50% 50%;
        border-radius: 50% 50%;
    }
    .chat-description {
        max-width: 86%;
        height: 50px;
        padding: 0 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

export const ChatHeader = styled.p`
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
