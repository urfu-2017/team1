import styled from 'styled-components';

export const ContactsWrapper = styled.article`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #f2f3dE;
    .header {
        padding: 0 0 0 20px;
        margin: 30px 0 0 0;
    }
    .buttons {
        width: 100%;
        height: 40px;
        display: flex;
        margin: 0 0 25px 0;
        justify-content: space-around
        align-items: center;
    }
`;

export const Search = styled.input`
    width: 100%;
    height: 45px;
    background: #f2f3dE;
    padding: 0 0 0 30px;
    border: none;
    border-bottom: 1px solid;
`;


export const CreateButton = styled.input`
    padding: 7px;
    border-radius: 5px;
    background: #e4e0dc;
`;