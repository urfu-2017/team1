import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';

import resolvers from '../resolvers';


function makeApolloClient(apiUrl) {
    const httpUrl = `https://${apiUrl}`;
    const websocketUrl = `wss://${apiUrl}`;

    const httpLink = new HttpLink({ uri: httpUrl });
    // TODO: auth troubles
    const wsLink = new WebSocketLink({
        uri: websocketUrl,
        options: {
            reconnect: true, //auto-reconnect
            // // carry login state (should use secure websockets (wss) when using this)
            connectionParams: {
                authToken: localStorage.getItem('scaphold_user_token')
            }
        }
    });
    const cache = new InMemoryCache(window.__APOLLO_STATE);
    const stateLink = withClientState({
        cache,
        resolvers,
        defaults: {
            some_key: 'some_value'
        }
    });

    const middlewareAuthLink = new ApolloLink((operation, forward) => {
        const token = localStorage.getItem('scaphold_user_token');
        if (!token)
            return forward(operation);
        const authorizationHeader = `Bearer ${token}`;
        operation.setContext({
            headers: {
                authorization: authorizationHeader
            }
        });
        return forward(operation);
    });

    const link = ApolloLink.from([
        stateLink,
        // auth
        ApolloLink.split(
            ({ query }) => {
                const { kind, operation } = getMainDefinition(query);
                return kind === 'OperationDefinition' && operation === 'subscription';
            },
            wsLink,
            httpLink)
    ]);

    return new ApolloClient({
        cache,
        link
    });
}

export default makeApolloClient;
