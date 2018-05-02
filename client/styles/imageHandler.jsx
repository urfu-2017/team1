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
    transform: translate(-50%, -50%);
    background: #fff;
    .header {
        text-align: center;
        z-index: -1;
        background: #639eca;
        color: white;
        width: 100%;
        padding: 20px 0;
        margin-bottom: 10px;
    }
    .buttons {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 20px;
    }
`;

export const DownloadImage = styled.div`
    position: relative;
    background: #fff;
    background-size: cover;
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed;
    margin-top: 15px;
    color: #639eca;
    .text {
        text-align: center;
        font-size: 20px;
        background: #fff;
        width: 180px;
    }
`;

export const DownloadButton = styled.input`
    width: 225px;
    padding: 7px;
    border-radius: 5px;
    background: #639eca;
    color: white;
    border: 1px solid;
`;

export const CreateButton = DownloadButton.extend`
    height: 36px;
    width: 85px;
    padding: 7px;
    border-radius: 5px;
    background: #639eca;
    color: white;
    border: 1px solid;
`;

export const Exit = styled.div`
    position: absolute;
    right: 5px;
    top: 0;
    font-size: 22px;
    color: white;
    cursor: pointer;
    padding: 5px;
`;
