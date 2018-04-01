const { parse } = require('url');

require('dotenv').config()
const next = require('next');
const passport = require('passport');
const server = require('express')();

const authMiddleware = require('./middleware/auth'); 
const routes = require('./routes');

server.use(require('cookie-parser')());
server.use(require('body-parser').urlencoded({ extended: true }));
server.use(require('express-session')({ secret: process.env.SECRET_KEY, resave: true, saveUninitialized: true }));;
server.use(passport.initialize());
server.use(passport.session());

server.use(authMiddleware());

<<<<<<< 4936fea40bfdb19fde8acbc80481df515df70c92
const app = next({ dev: process.env.NODE_ENV !== 'production' });

=======
>>>>>>> add send message
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
