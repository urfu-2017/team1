import styled from 'styled-components';

export const Editor = styled.article`
    width: 340px;
    height: 350px;
    top: 50%;
    left: 50%;
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    transform: translate(-50%, -50%);
    background: #f2f3dE;
    .header {
        padding: 0 30px;
    }
    .buttons {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-around
        align-items: center;
    }
`;

export const DowlandImage = styled.div`
    background-size: cover;
    opacity: 0.3;
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed;
    .text {
        font-size: 20px;
        background: #fff;
    }
`;

export const DowlandButton = styled.input`
    width: 225px;
    padding: 7px;
    border-radius: 5px;
    background: #e4e0dc;
`;

export const CreateButton = DowlandButton.extend`
    width: 85px;
    padding: 7px;
    border-radius: 5px;
    background: #e4e0dc;
`;

export const Exit = styled.div`
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 0;
    font-size: 30px;
`;
