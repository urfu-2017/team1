import styled from 'styled-components';

export const MessagesList = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Header = styled.section`
    height: 65px !important;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #5682a3;
`;

export const ScrollButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 0;
    margin-bottom: 10px;
    width: 30px;
    height: 30px;
    border: 2px solid #b7c5f5;
    border-radius: 50%;
    color: #b7c5f5;
    position: fixed;
    bottom: 50px;
    @media screen and (max-width: 1260px) {
        right: 50px;
    }
    @media screen and (min-width: 1261px) {
        right: calc((100% - 1260px) / 2 + 50px);
    }
    cursor: pointer;
    &::before {
        content: '▼';
        font-weight: 900;
        font-size: 20px;
    }
`;
