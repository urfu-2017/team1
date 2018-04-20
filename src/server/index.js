const { parse } = require('url');
const path = require('path');

require('dotenv')
    .config();
const next = require('next');

const passport = require('passport');
const cookieParser = require('cookie-parser');

const authMiddleware = require('./middleware/auth');
const routes = require('./routes');
const session = require('express-session');
const memoryStore = require('session-memory-store')(session)();
const express = require('express');

const server = require('express')();
const request = require('request');
const { ApolloClient } = require('apollo-client');
const { HttpLink } = require('apollo-link-http');
const gql = require('graphql-tag');
const fetch = require('node-fetch');
const { createHttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');


const Scaphold = require('./repository/scaphold')


function main() {
    server.use(cookieParser());
    server.use(require('body-parser').urlencoded({ extended: true }));

    server.use(session({
        store: memoryStore,
        secret: process.env.SECRET_KEY,
        resave: true,
        saveUninitialized: true
    }));

    server.use('/static', express.static(path.resolve(__dirname, '../public')));

    server.use(passport.initialize());
    server.use(passport.session());

    server.use(authMiddleware());


    const app = next({ dir: './src', dev: process.env.NODE_ENV !== 'production' });

    const render = pageName => (req, res) => app.render(req, res, `/${pageName}`);
    const handleRequest = (req, res) =>
        app.getRequestHandler()(req, res, parse(req.url, true));

    server.use((req, res, nextMiddleware) => {

        req.scapholdUrl = 'us-west-2.api.scaphold.io/graphql/kilogram-test';

        nextMiddleware();
    });

    app.prepare().then(() => {
        routes(server);
        server
            .get('*', handleRequest)
            .listen(3000, () => console.log('Listening on http://localhost:3000'));
    });
}


main();
