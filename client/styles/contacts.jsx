import styled from 'styled-components';

export const ContactsWrapper = styled.article`
    width: 340px;
    height: 500px;
    top: 50%;
    left: 50%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    transform: translate(-50%, -50%);
    background: #fff;
    color: black;
    .header {
        padding: 20px 0;
        text-align: center;
        color: white;
        background: #639eca;
    }
    .buttons {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
`;

export const Search = styled.input`
    width: 100%;
    height: 45px;
    background: #fff;
    padding: 0 0 0 30px;
    border: none;
    border-bottom: 1px solid #639eca;
`;

export const ContactsList = styled.section`
    width: 100%;
    height: 350px;
    &:hover {
        background: #639eca33;
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
        border 1px solid #639eca;
        margin: 0 16px;
    }
`;

export const CreateButton = styled.input`
    padding: 7px;
    border-radius: 5px;
    background: #639eca;
    color: white;
    border: 1px solid;
`;

export const CloseButton = CreateButton.extend`
    background: #639eca;
    color: white;
    border: 1px solid;
`;
