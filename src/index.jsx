import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/app.jsx';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import makeApolloClient from './lib/make-apollo-client';
import config from './config';


const client = makeApolloClient(config.scapholdUrl);


const getRoot = (App) => (
    <AppContainer>
        <ApolloProvider client={client}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                </Route>
            </Router>
        </ApolloProvider>
    </AppContainer>
);

ReactDOM.render(getRoot(App), document.querySelector('#app'));


// Это пока не нужно

// if (module.hot) {
//     module.hot.accept('./components/app.jsx', () => {
//         const App = require('./components/app.jsx').default;
//         ReactDOM.render(
//             getRoot(App),
//             document.querySelector('#app')
//         );
//     });
// }
