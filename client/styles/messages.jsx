import styled from 'styled-components';

export const MessagesList = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Header = styled.section`
    height: 74px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f2f3de;
`;

export const Button = styled.input`
    backgroundColor: white;
    position: fixed;
    padding: 0;
    bottom: 60px;
    right: 10px;
    width: 30px;
    height: 30px;
    border: 2px solid #b7c5f5;
    border-radius: 50%;
    color: #b7c5f5;
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

