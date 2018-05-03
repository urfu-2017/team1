import React from 'react';
import { AuthWrapper } from '../styles/auth';

export default class Auth extends React.Component {
    render () {
        return <AuthWrapper>
            <div className="blocks-wrapper">
                <div className="block-header"></div>
                <div className="block-inner">
                    <div className="inner">
                        <div className="inner__text">
                            Авторизоваться через:
                        </div>    
                        <a href="/auth/github/">
                            <div className="inner__image" />
                        </a>
                    </div>
                </div>
                <div className="block-footer">
                    <div className="footer">
                        Добро пожаловать в Web-версию Kilogram!
                    </div>
                </div>
            </div>    
        </AuthWrapper>;
    }
}
