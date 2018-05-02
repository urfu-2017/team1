import styled from 'styled-components';

export const Header = styled.header`
    min-height: 55px;
    display: flex;
    color: white;
    background-color: #639eca;
    align-items: center;
    justify-content: space-around;
    .header__menu-icon {
        cursor: pointer;
    }
`;

export const SearchInput = styled.input`
    height: 40px;
    width: 80%;
    visibility: hidden;
`;

export const ChatsList = styled.section`
    width: 35%;
    min-width: 250px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: #fff;
`;

export const Paranja = styled.section`
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    background: #fff;
    max-width: 1260px;
`;

export const Contacts = styled.section`
    width: 340px;
    height: 400px;
    overflow: hidden;
    border: 1px solid;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    .contacts__list {
        width: 360px;
        height: 400px;
        overflow-y: scroll;
    }
`;

export const Contact = styled.div`
    display: flex;
    width: 100%;
    height: 40px;
    cursor: default;
    margin: 10px 0;
    .contact__image {
        width: 35px;
        height: 35px;
        border 1px solid;
        margin: 0 15px;
    }
`;
