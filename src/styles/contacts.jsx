import styled from 'styled-components';

export const ContactsWrapper = styled.article`
    height: 100%;
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

export const ContactsList = styled.section`
    width: 100%;
    height: 350px;
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

export const CreateButton = styled.input`
    padding: 7px;
    border-radius: 5px;
    background: #e4e0dc;
`;

export const CloseButton = CreateButton.extend`
`;
