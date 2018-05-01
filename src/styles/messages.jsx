import styled from 'styled-components';

export const MessagesList = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Header = styled.section`
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255,255,255, .7);
`;

export const ScrollButton = styled.div`
    background-color: white;
    position: fixed;
    padding: 0;
    margin-bottom: 10px;
    bottom: 50px;
    width: 30px;
    height: 30px;
    border: 2px solid #b7c5f5;
    border-radius: 50%;
    color: #b7c5f5;
    left: 92%;
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
