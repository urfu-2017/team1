import styled from 'styled-components';

export const AuthWrapper = styled.section`
    width: 100%;
    overflow: hidden;
    .blocks-wrapper {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: #e7ebf0;
    }
    .block-header {
        height: 30%;
        width: 100%;
        background: #5682a3;
    }
    .block-inner {
        position: absolute;
        border-radius: 5px 5px;
        top: 25%;
        background: #fff;
        width: 30%;
        left: 35%;
    }
    .inner {
        box-shadow: rgba(82, 79, 79, 0.26) 0px 0px 22px 0px;
        box-sizing: border-box;
        text-align: center;
        padding: 20px;
    }
    .inner__image {
        cursor: pointer;
        width: 35px;
        height: 35px;
        margin: auto;
        margin-top: 10px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("/static/images/github_icon.png");
    }
    .footer {
        text-align: center;
        margin: 100px;
    }
`;