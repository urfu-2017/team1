import React from 'react';

import ChatWindow from './ChatWindow';


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
