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
    border: 1.5px solid #e6e6fa;
    border-radius: 5px;
    background: #fff;
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

export const DownloadImage = styled.div`
    background-size: cover;
    margin-top: 60px;
    color: #5682a3;
    opacity: 0.3;
    width: 200px;
    height: 200px;
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
