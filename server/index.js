const { parse } = require('url');

const next = require('next');
const passport = require('passport');
const server = require('express')();

const authMiddleware = require('./middleware/auth'); 
const routes = require('./routes');
const config = require('../config')

server.use(require('cookie-parser')());
server.use(require('body-parser').urlencoded({ extended: true }));
server.use(require('express-session')({ secret: config.secret_key, resave: true, saveUninitialized: true }));;
server.use(passport.initialize());
server.use(passport.session());

server.use(authMiddleware());

const app = next({ dev: process.env.NODE_ENV !== 'production' });

const render = pageName => (req, res) => app.render(req, res, `/${pageName}`);
const handleRequest = (req, res) =>
    app.getRequestHandler()(req, res, parse(req.url, true));

const port = process.env.PORT || 3000;

app.prepare().then(() => {
    routes(server);
    server
        .get('*', handleRequest)
        .listen(port, () => console.log(`Listening on http://localhost:${port}`));
});
