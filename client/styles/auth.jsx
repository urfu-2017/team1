import styled from 'styled-components';

export const AuthWrapper = styled.section`
    width: 100%;
    overflow: hidden;
    color: #fff;
    .inner {
        margin: 15% 40%;
        box-sizing: border-box;
        background: #639eca;
        border-radius: 10px 10px;
        text-align: center;
        padding: 10px;
    }
    .inner__image {
        width: 35px;
        height: 35px;
        margin-left: 40%;
        margin-top: 10px;
        &:before {
            font-family: FontAwesome5-brands;
            content: '\f09b';
            font-weight: 400;
            font-size: 36px;
            color: #fff;
        }
    }
    a {
        text-decoration: none;
    }
`;