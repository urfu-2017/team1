import React from 'react';
import styled from 'styled-components';

const AuthWrapper = styled.section`
    width: 100%;
    overflow: hidden;
    .inner {
        margin: 15% 40%;
        box-sizing: border-box;
        background: #f2f3ee;
        border-radius: 10px 10px;
        text-align: center;
        padding: 10px;
    }
    .inner__image {
        width: 35px;
        height: 35px;
        margin-left: 40%;
        margin-top: 10px;
        background-size:  contain;
        background-image: url("/static/images/github_icon.png");
    }
`;

export default class Auth extends React.Component {
    render () {
        return <AuthWrapper>
            <div className="blockInner">
                <div className="inner">
                    Авторизоваться через:
                    <a href="/auth/github/">
                        <div className="inner__image"></div>
                    </a>
                </div>
            </div>
        </AuthWrapper>;
    }
}
