const { parse } = require('url');
const path = require('path');

require('dotenv').config();
const next = require('next');
const passport = require('passport');
const express = require('express');

const server = express();

const restRoutes = require('./controllers/rest/routes');
const authMiddleware = require('./middleware/auth');
const routes = require('./routes');

server.use(require('cookie-parser')());
server.use(require('body-parser').urlencoded({ extended: true }));
server.use(require('express-session')({ secret: process.env.SECRET_KEY, resave: true, saveUninitialized: true }));

server.use('/static', express.static(path.resolve(__dirname, '../public')));

server.use(passport.initialize());
server.use(passport.session());

server.use(authMiddleware());

const app = next({ dev: process.env.NODE_ENV !== 'production' });

const render = pageName => (req, res) => app.render(req, res, `/${pageName}`); // eslint-disable-line no-unused-vars, max-len
const handleRequest = (req, res) =>
    app.getRequestHandler()(req, res, parse(req.url, true));

const port = process.env.PORT || 3000;

app.prepare().then(() => {
    routes(server);
    server
        .use('/api/rest', restRoutes)
        .get('*', handleRequest)
        .listen(port, () => console.log(`Listening on http://localhost:${port}`)); // eslint-disable-line no-console, max-len
});
