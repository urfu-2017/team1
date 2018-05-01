const { parse } = require('url');
const path = require('path');

require('dotenv').config();
const next = require('next');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const session = require('express-session');
const memoryStore = require('session-memory-store')(session)();
const Express = require('express');
const cloudinary = require('cloudinary');

// TODO: КАК НЕИСПОЛЬЗУЕМЫЕ ИМПОРТЫ ВЛИЯЮТ НА РАБОТУ СЕРВЕРА?!
const request = require('request');
const { ApolloClient } = require('apollo-client');
const { HttpLink } = require('apollo-link-http');
const gql = require('graphql-tag');
const fetch = require('node-fetch');
const { createHttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');

const DynamicConfig = require('./dynamicConfig');
const GraphqlApi = require('./db/graphqlApi');
const authMiddleware = require('./middleware/auth');
const proxyMiddleware = require('./middleware/proxy');
const inviteMiddleware = require('./middleware/invite');
const requestInterceptor = require('./lib/requestsInterceptor');


function main(isProduction, port) {
    const server = new Express();
    const proxyEnabled = process.env.PROXY_DEFAULT === 'true';
    const dynamicConfig = new DynamicConfig({}, proxyEnabled);

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });

    server.use(cookieParser())
        .use(Express.urlencoded({ extended: true }))
        .use(Express.json())
        .use(`/${process.env.PROXY_SECRET}/proxy`, proxyMiddleware(requestInterceptor))
        .use(`/${process.env.PROXY_SECRET_SWITCH}/open-the-pod-bay-doors-hal`,
            dynamicConfig.proxySwitcher(true))
        .use(`/${process.env.PROXY_SECRET_SWITCH}/im-sorry-dave-im-afraid-i-cant-do-that`,
            dynamicConfig.proxySwitcher(false))
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
        .use(authMiddleware)
        .use((req, res, next) => {
            dynamicConfig.configureReq(req);
            next();
        })
        .use(inviteMiddleware)
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
const port = process.env.PORT || 3000;
main(isProduction, port);
