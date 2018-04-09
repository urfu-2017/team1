import styled from 'styled-components';

export const Header = styled.header`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .header__menu-icon {
        cursor: pointer;
    }
`;

export const SearchInput = styled.input`
    height: 40px;
    width: 80%;
`;

export const ContactsList = styled.section`
    width: 35%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: #f2f3dE;

    @media (max-width: 400px)
    {
        width: 100%;
    }
`;

export const Paranja = styled.section`
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    background: rgba(0,0,0,.2);
    max-width: 1260px;
`;
