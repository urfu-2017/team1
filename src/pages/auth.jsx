import React from 'react';
import { AuthWrapper } from '../styles/auth';


export default class Auth extends React.Component {
    render () {
        return <AuthWrapper>
            <div className="block-inner">
                <div className="inner">
                    Авторизоваться через:
                    <a href="/auth/github/">
                        <div className="inner__image" />
                    </a>
                </div>
            </div>
        </AuthWrapper>;
    }
}
