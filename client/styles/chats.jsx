import styled from 'styled-components';

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
    background: #f2f3dE;
`;

export const Paranja = styled.section`
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    background: rgba(0,0,0,.2);
    max-width: 1260px;
`;