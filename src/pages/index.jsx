import React from 'react';

import createNextPage from '../lib/createNextPage';
import App from '../components/app';


export default class Index extends React.Component {
    static async getInitialProps({ req }) {
        return {
            initialState: req.state,
            currentUser: req.user,
            dbApiUrl: req.dbApiUrl
        };
    }

    render() {
        return createNextPage(this.props.dbApiUrl, App, { currentUser: this.props.currentUser });
    }
}
