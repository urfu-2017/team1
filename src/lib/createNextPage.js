import React from 'react';
import { ApolloProvider } from 'react-apollo';

import createApolloClient from '../lib/createApolloClient';


export default (scapholdUrl, Component, props) => {
    const client = createApolloClient(scapholdUrl);

    return (
        <ApolloProvider client={client}>
            <Component {...props} />
        </ApolloProvider>
    )}
