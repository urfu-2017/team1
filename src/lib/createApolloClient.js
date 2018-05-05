import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import fetch from 'isomorphic-unfetch';

// import resolvers from '../resolvers/index';
// import initialState from '../initialState';  // TODO: pass values directly from server to client


const isOnServer = !process.browser;
let apolloClient = null;

if (isOnServer) {
    global.fetch = fetch;
}


function create(httpUrl, wsUrl) {
    const httpLink = new BatchHttpLink({ uri: httpUrl, batchInterval: 30 });

    const cache = new InMemoryCache({
        // dataIdFromObject: ({ __typename, contentId }) =>
        //     (contentId ? `${__typename}:${contentId}` : null)
    });

    // cache.restore(initialState || {});
    // const stateLink = withClientState({
    //     cache,
    //     resolvers,
    //     defaults: initialState
    // });

    const middlewareAuthLink = new ApolloLink((operation, forward) => {
        const token = localStorage.getItem('user_token');
        if (!token) {
            return forward(operation);
        }
        const authorizationHeader = `Bearer ${token}`;
        operation.setContext({
            headers: {
                authorization: authorizationHeader
            }
        });
        return forward(operation);
    });


    let link = httpLink;

    if (!isOnServer) {
        const wsLink = new WebSocketLink({
            uri: wsUrl,
            options: {
                reconnect: true,
                // timeout: 30000
            }
        });

        link = ApolloLink.from([
            ApolloLink.split(
                ({ query }) => {
                    const { kind, operation } = getMainDefinition(query);
                    return kind === 'OperationDefinition' && operation === 'subscription';
                },
                wsLink,
                httpLink
            )
        ]);
    }


    return new ApolloClient({
        connectToDevTools: isOnServer,
        ssrMode: isOnServer, // Disables forceFetch on the server (so queries are only run once)
        link: link,
        cache,
        queryDeduplication: true
    });
}


export default function initApollo(httpUrl, wsUrl, initialState) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (isOnServer) {
        return create(httpUrl, wsUrl);
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(httpUrl, wsUrl);
    }
    return apolloClient;
}
