import styled from 'styled-components';

export const MessagesList = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Header = styled.section`
    min-height: 59px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #5682a3;
    .header__editor {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .header__img {
        color: #fff;
        margin: 0 15px 0 0;
    }
`;

export const ScrollButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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
        content: '▼';
        font-weight: 900;
        font-size: 20px;

    }
`;
