import App from '../components/app.jsx';
import createNextPage from '../lib/createNextPage';
import React from 'react';

export default class KilogrammApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static async getInitialProps({ req }) {
        return {
            initState: req.state,
        };
    }

    render() {
        return createNextPage(App, this.props.initState);
    }
}
