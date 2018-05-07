import styled from 'styled-components';

export const ContactsWrapper = styled.article`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
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
    .button_close {
        padding: 7px 15px;
        border-radius: 5px;
        background: lavender;
        color: #000;
    }
`;

export const CreateButton = styled.input`
    padding: 7px;
    border-radius: 5px;
    background: #e4e0dc;
`;