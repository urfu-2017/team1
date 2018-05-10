import React from 'react';

import createNextPage from '../lib/createNextPage';
import App from '../components/app';


export default class Index extends React.Component {
    static async getInitialProps({ req }) {
        if (!req) return {};  // there is probably a bug in next.js
        return {
            initialState: req.state,
            currentUser: req.user,
            httpUrl: req.httpUrl,
            wsUrl: req.wsUrl,
            currentChatId: req.currentChatId,
            serverUrl: req.serverUrl
        };
    }

    render() {
        const {
            httpUrl,
            wsUrl,
            initialState,
            currentUser: { id: userId },
            currentChatId,
            serverUrl
        } = this.props;
        return createNextPage(httpUrl, wsUrl, initialState, App, { userId, currentChatId, serverUrl });
    }
}
