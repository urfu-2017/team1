import styled from 'styled-components';

export const Editor = styled.article`
    width: 340px;
    height: 400px;
    top: 50%;
    left: 50%;
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    transform: translate(-50%, -50%);
    background: #f2f3dE;
    .image {
        width: 90px;
        height: 90px;
        border: 1px solid;
    }
    .chat-editor {
        text-align:center;
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
    width: 300px;
    height: 200px;
    border: 1px solid;

`;

export const Contact = styled.p`
    padding: 0 0 0 20px;
`;
