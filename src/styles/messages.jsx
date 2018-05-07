import styled from 'styled-components';

export const MessagesList = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Header = styled.section`
    min-height: 58px;
    max-height: 58px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: ${props => !props.isNightTheme ? '#5682a3' : '#37474F'};
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
        right: calc((100vw - 1260px) / 2 + 50px);
    }
    cursor: pointer;
    &::before {
        content: '▼';
        font-weight: 900;
        font-size: 20px;

    }
`;
