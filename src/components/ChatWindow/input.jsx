import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';


const SEND_MESSAGE_ql = gql`
mutation CreateMessage($msg: CreateMessageInput!) {
    createMessage(input: $msg) {
        changedMessage {
            text
            id
        }
    }
}
`;


export default class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };
    }

    _handleChange = e => {
        this.setState({ message: e.target.value });
    };

    render() {
        return (
            <Mutation mutation={SEND_MESSAGE_ql}>{
                (addMessage) =>
                    <input
                        type="text"
                        value={this.state.message}
                        onKeyPress={e => {
                            if (e.key !== 'Enter') {
                                return;
                            }
                            e.preventDefault();
                            addMessage({ variables: { msg: { text: this.state.message } } });
                            this.setState({ message: '' });
                        }}
                        onChange={this._handleChange}
                    />
            }</Mutation>
        );
    }
}
