import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/app.jsx';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, Link, browserHistory } from 'react-router';
import makeApolloClient from './lib/makeApolloClient';
import config from './config';

const client = makeApolloClient(config.scapholdUrl);

const root = (
    <AppContainer>
        <ApolloProvider client={client}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                </Route>
            </Router>
        </ApolloProvider>
    </AppContainer>
);

render(root, document.querySelector('#app'));

if (module.hot) {
    module.hot.accept('./components/app.jsx', () => {
        const App = require('./components/app.jsx').default;
        render(
            <AppContainer>
                <ApolloProvider client={client}>
                    <Router history={browserHistory}>
                        <Route path="/" component={App}>
                        </Route>
                    </Router>
                </ApolloProvider>
            </AppContainer>,
            document.querySelector('#app')
        );
    });
}
