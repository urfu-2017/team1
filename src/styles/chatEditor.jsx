import styled from 'styled-components';

export const Editor = styled.article`
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
<<<<<<< 724d9cae2dcc6ae08426775fdeafbb814b9f5659
    background: #fff;
    .image {
        height: 130px;
        width: 130px;
        margin: 20px 50px;
        border-radius: 50% 50%;
    }
    .chat-editor {
        height: 130px;
        border-left: 1px solid lavender;
=======
    background: #f2f3dE;
    .image {
        width: 130px;
        margin: 20px 50px;
        border: 1px solid;
    }
    .chat-editor {
>>>>>>> editor chats
        text-align: center;
        width: 60%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .link {
<<<<<<< 724d9cae2dcc6ae08426775fdeafbb814b9f5659
        border-top: 1px solid lavender;
        border-bottom: 1px solid lavender;
        padding: 5px;
        width: 77%;
    }
    .link a {
        text-decoration: none;
        color: deeppink;
=======
        width: 77%;
>>>>>>> editor chats
    }
    .chat-editor__header {
        width: 190px;
        margin: 8px 0;
        font-size: 16px;
    }
`;

export const AddButton = styled.input`
    width: 77%;
    background: lavender;
    border: none;
    cursor: pointer;
    padding: 7px;
    margin: 10px;
    border-radius: 5px;
`;

export const UserList = styled.section`
    width: 80%;
    height: 400px;
`;

