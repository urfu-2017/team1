import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import fetch from 'isomorphic-unfetch';

import resolvers from '../resolvers/index';
import initialState from '../initialState';  // TODO: pass values directly from server to client


const isOnServer = !process.browser;
let apolloClient = null;

if (isOnServer) {
    global.fetch = fetch;
}


function create(apiUrl) {
    const httpUrl = `https://${apiUrl}`;
    const websocketUrl = `wss://${apiUrl}`;

    const httpLink = new HttpLink({ uri: httpUrl });

    const cache = new InMemoryCache({
        dataIdFromObject: ({ __typename, contentId }) =>
            (contentId ? `${__typename}:${contentId}` : null)
    });

    cache.restore(initialState || {});
    const stateLink = withClientState({
        cache,
        resolvers,
        defaults: initialState
    });

    const middlewareAuthLink = new ApolloLink((operation, forward) => {
        const token = localStorage.getItem('scaphold_user_token');
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
        // TODO: fix socket connection
        const wsLink = new WebSocketLink({
            uri: websocketUrl,
            options: {
                reconnect: true //auto-reconnect
                // // carry login state (should use secure websockets (wss) when using this)
                // connectionParams: {
                //     authToken: localStorage.getItem('scaphold_user_token')
                // }
            }
        });

        link = ApolloLink.from([
            stateLink,
            // auth
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
        link: ApolloLink.from([stateLink, link]),
        cache,
        queryDeduplication: true
    });
}


export default function initApollo(initialState) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (isOnServer) {
        return create(initialState);
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState);
    }
    return apolloClient;
}
