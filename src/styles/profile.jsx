import styled from 'styled-components';


export const Editor = styled.article`
    width: 65%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    border: 1.5px solid #e6e6fa;
    border-radius: 5px;
    border-left: none;
    background: #fff;
    .header {
    }
    .editorName {
        position: relative;
        justifyContent: center;
        alignItems: center;
        display: flex;
        background: #5682a3;
        color: #fff;
        width: 100%;
        height: 59px;
        align-items: center;
        justify-content: center;
        top: -2px;
    }
    .buttons {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-around
        align-items: center;
    }
`;

export const DownloadImage = styled.div`
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
    width: 225px;
    padding: 7px;
    border-radius: 5px;
    background: #5682a3;
    height: 22px;
    color: #fff;
    margin-bottom: 40px;
`;

export const CreateButton = DownloadButton.extend`
    outline:none;
    cursor: pointer;
    border: none;
    width: 85px;
    padding: 7px;
    border-radius: 5px;
    height: 36px;
    color: #fff;
`;    


export const Exit = styled.div`
    cursor: pointer;
    position: absolute;
    right: 5px;
    font-size: 22px;
`;
