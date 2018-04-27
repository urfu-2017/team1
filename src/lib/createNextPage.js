import React from 'react';
import {ApolloProvider} from 'react-apollo';

import createApolloClient from '../lib/createApolloClient';


export default (httpUrl, wsUrl, Component, props) => {
    const client = createApolloClient(httpUrl, wsUrl);

    return (
        <ApolloProvider client={client}>
            <Component {...props} />
        </ApolloProvider>
    );
}
