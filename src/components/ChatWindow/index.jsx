import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Input from './input';
import Message from './message';


const GET_MESSAGES_ql = gql`
query {
    viewer {
        allMessages {
            edges {
                node {
                    id
                    createdAt
                    text
                }
            }
        }
    }
}
`;


export default class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
    }

    _getMessages() {
        return (
            <Query
                query={GET_MESSAGES_ql}
                pollInterval={500}
            >{
                ({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;

                    return (
                        <div>
                            {ChatWindow._mapTextToMessages(data.viewer.allMessages.edges)}
                        </div>
                    );
                }
            }</Query>
        );
    }

    static _mapTextToMessages(messages) {
        return messages.map(
            (msg, i) => <Message text={msg.node.text} key={i.toString()} />
        );
    }

    render() {
        return (
            <div>
                <div>
                    {this._getMessages()}
                </div>
                <Input/>
            </div>
        );
    }
}
