import { ApolloProvider } from 'react-apollo';

import makeApolloClient from '../lib/createApolloClient';
import config from '../config';



export default (Component, state, scapholdUrl) => {
    const client = makeApolloClient(scapholdUrl);
    console.log('+++++');
    console.log(scapholdUrl);
    console.log('+++++');
    return (
        <ApolloProvider client={client}>
            <Component />
        </ApolloProvider>
    )}
