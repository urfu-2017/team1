import { ApolloProvider } from 'react-apollo';

import makeApolloClient from '../lib/createApolloClient';
import config from '../config';



export default (Component, state) => {
    const client = makeApolloClient(config.scapholdUrl);
    console.log('+++++');
    console.log(state);
    console.log('+++++');
    return (
        <ApolloProvider client={client}>
            <Component />
        </ApolloProvider>
    )}
