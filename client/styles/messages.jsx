import styled from 'styled-components';

export const MessagesList = styled.section`
    width: 100%;
    overflow-y: scroll;
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: #ffffff;
`;

export const Header = styled.section`
    height: 55px;
    width: 100%;
    display: flex;
    font-weight: 600;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: #639eca;
    &.header-chat-edit {
        cursor: pointer;
    }
    &.header-chat-edit::after {
        font-family: FontAwesome5;
        font-weight: 900;
        content: '\f303';
        padding-left: 5px;
        font-size: 10px;
    }
`;

export const Button = styled.div`
    background-color: white;
    position: absolute;
    padding: 0;
    margin-right: 128px;
    margin-bottom: 10px;
    bottom: 50px;
    width: 30px;
    height: 30px;
    border: 2px solid #b7c5f5;
    border-radius: 50%;
    color: #b7c5f5;
    right: 30px;
    cursor: pointer;

    &::before {
        font-family: FontAwesome5;
        content: '\f107';
        font-weight: 900;
        position: absolute;
        top: 4px;
        left: 7px;
        font-size: 24px;
    }
`;

