import React from 'react';

import ChatWindow from './ChatWindow/index';


export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ChatWindow />
            </div>
        );
    }
}
