import styled from 'styled-components';

export const Editor = styled.article`
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    background: #f2f3dE;
    .image {
        width: 130px;
        margin: 20px 50px;
        border: 1px solid;
    }
    .chat-editor {
        text-align: center;
        width: 60%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .link {
        width: 77%;
    }
    .chat-editor__header {
        width: 190px;
        margin: 8px 0;
        font-size: 16px;
    }
`;

export const AddButton = styled.input`
    padding: 7px;
    margin: 10px;
    border-radius: 5px;
    background: #e4e0dc;
`;

export const UserList = styled.section`
    width: 80%;
    height: 400px;
`;

