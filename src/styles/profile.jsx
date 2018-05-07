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
    .editorName {
        justifyContent: center;
        alignItems: center;
        display: flex;
        background: ${props => !props.isNightTheme ? '#5682a3' : '#37474F'};
        position: relative;
        color: #fff;
        width: 100%
        align-items: center;
        max-height: 59px;
        min-height: 59px;
        top: -2px;
        justify-content: center;
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
        color: ${props => props.isNightTheme ? '#fff' : '#454648'}
        background:  ${props => props.isNightTheme ? 'none' : '#fff'};
    }
`;

export const DownloadButton = styled.input`
    outline:none;
    cursor: pointer;
    width: auto;
    height: auto;
    padding: 7px;
    border-radius: 5px;
    background: ${props => props.isNightTheme ? 'lavender' : '#5682a3'};
    color: ${props => props.isNightTheme ? '#000': '#fff'};
    margin-bottom: 40px;
`;

export const CreateButton = DownloadButton.extend`
    background: ${props => props.isNightTheme ? 'lavender' : '#5682a3'};
    color: ${props => props.isNightTheme ? '#000': '#fff'};
    outline:none;
    cursor: pointer;
    border: none;
    width: auto;
    height: 31px;
    padding: 7px;
    border-radius: 5px;
`;    


export const Exit = styled.div`
    cursor: pointer;
    position: absolute;
    right: 5px;
    font-size: 22px;
`;
