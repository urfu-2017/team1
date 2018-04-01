import React from 'react';

export default class extends React.Component {
    static async getInitialProps({ req }) {
        const user = req.user;
        return { user }
    }
    render() {  
        return <div>Hello {this.props.user.username}! Here was start page</div>
    }
}
