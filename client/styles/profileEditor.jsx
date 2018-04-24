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

export const DownloadImage = styled.div`
    position: relative;
    background: #fff;
    background-size: cover;
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
    .spinner {
        display: none;
        width: 100px;
        height: 100px;
        background-size: 100px;
        background-image: url(https://i0.wp.com/www.dynamocoop.be/wp-content/uploads/2015/10/spin.gif);
        position: absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        margin: auto;
    }
`;

export const DownloadButton = styled.input`
    width: 225px;
    padding: 7px;
    border-radius: 5px;
    background: #e4e0dc;
`;

export const CreateButton = DownloadButton.extend`
    width: 85px;
    padding: 7px;
    border-radius: 5px;
    background: #e4e0dc;
`;

export const Exit = styled.div`
    position: absolute;
    right: 5px;
    top: 0;
    font-size: 30px;
`;
