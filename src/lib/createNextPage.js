import { ApolloProvider } from 'react-apollo';

import makeApolloClient from '../lib/createApolloClient';
import config from '../config';


const client = makeApolloClient(config.scapholdUrl);

export default Component => (
    <ApolloProvider client={client}>
        <Component />
    </ApolloProvider>
);
