const { parse } = require('url');
const path = require('path');

require('dotenv').config();
const next = require('next');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes');
const session = require('express-session');
const memoryStore = require('session-memory-store')(session)();
const Express = require('express');

// TODO: КАК НЕИСПОЛЬЗУЕМЫЕ ИМПОРТЫ ВЛИЯЮТ НА РАБОТУ СЕРВЕРА?!
const request = require('request');
const { ApolloClient } = require('apollo-client');
const { HttpLink } = require('apollo-link-http');
const gql = require('graphql-tag');
const fetch = require('node-fetch');
const { createHttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');

const Scaphold = require('./db/scaphold');
const authMiddleware = require('./middleware/auth');


function main(isProduction, port) {
    const server = new Express();

    server.use(cookieParser())
        .use(bodyParser.urlencoded({ extended: true }))
        .use(
            session({
                store: memoryStore,
                secret: process.env.SECRET_KEY,
                resave: true,
                saveUninitialized: true
            })
        )
        .use('/static', Express.static(path.resolve(__dirname, '../public')))
        .use(passport.initialize())
        .use(passport.session())
        .use(authMiddleware())
        .use((req, res, next) => {
            req.state = {};
            req.httpUrl = process.env.HTTP_API_URL;
            req.wsUrl = process.env.WS_API_URL;
            next();
        })
        .use(routes);

    const app = next({ dir: './src', dev: !isProduction });
    const render = pageName => (req, res) => app.render(req, res, `/${pageName}`);
    const handleRequest = (req, res) =>
        app.getRequestHandler()(req, res, parse(req.url, true));

    app.prepare().then(() => {
        server
            .get('*', handleRequest)
            .listen(port, () => console.log(`Listening on http://localhost:${port}`));
    });
}


const isProduction = process.env.NODE_ENV === 'production';
const port = 3000;
main(isProduction, port);
