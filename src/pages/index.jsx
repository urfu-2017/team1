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
            wsUrl: req.wsUrl
        };
    }

    render() {
        return createNextPage(this.props.httpUrl, this.props.wsUrl,
            App, { currentUser: this.props.currentUser });
    }
}
