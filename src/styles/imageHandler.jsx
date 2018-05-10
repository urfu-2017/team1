import styled from 'styled-components';

export const Editor = styled.article`
    width: 100%;
    height: 100%;
    top: 0
    left: 50%;
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    transform: translateX(-50%);
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
    .editorName {
        justifyContent: center;
        alignItems: center;
        display: flex;
        background: #5682a3;
        position: relative;
        color: #fff;
        width: 100%
        align-items: center;
        min-height: 64px;
        top: -5px;
        justify-content: center;
    }
`;

export const DownloadImage = styled.div`
    text-align: center;
    min-width: 300px;
    background-size: cover;
    margin-top: 10px;
    color: #5682a3;
    opacity: 0.3;
    width: 50%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px #5682a3 dashed;
    .text {
        font-size: 20px;
        background: #fff;
    }
`;

export const DownloadButton = styled.input`
    outline:none;
    cursor: pointer;
    width: auto;
    height: auto;
    padding: 7px;
    border-radius: 5px;
    background: #5682a3;
    color: #fff;
    margin-bottom: 40px;
`;

export const CreateButton = DownloadButton.extend`
    outline:none;
    cursor: pointer;
    border: none;
    padding: 7px;
    border-radius: 5px;
    width: auto;
    height: 31px;
    color: #fff;
`;    


export const Exit = styled.div`
    cursor: pointer;
    position: absolute;
    right: 5px;
    font-size: 22px;
`;