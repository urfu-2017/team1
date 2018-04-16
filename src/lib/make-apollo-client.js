import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getOperationAST } from 'graphql';


function makeApolloClient(apiUrl) {
    const httpUrl = `https://${apiUrl}`;
    const websocketUrl = `wss://${apiUrl}`;

    const link = ApolloLink.split(
        operation => {
            const operationAST = getOperationAST(operation.query, operation.operationName);
            return !!operationAST && operationAST.operation === 'subscription';
        },
        // TODO: auth troubles
        new WebSocketLink({
            uri: websocketUrl,
            options: {
                reconnect: true, //auto-reconnect
                // // carry login state (should use secure websockets (wss) when using this)
                connectionParams: {
                    authToken: localStorage.getItem('scaphold_user_token')
                }
            }
        }),
        new HttpLink({ uri: httpUrl })
    );

    const cache = new InMemoryCache(window.__APOLLO_STATE);

    return new ApolloClient({
        link,
        cache
    });
}

export default makeApolloClient;
