const { parse } = require('url');
const path = require('path');

require('dotenv')
    .config();
const next = require('next');
const passport = require('passport');
const passportSocketIo = require('passport.socketio');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const server = require('http')
    .Server(app);
const io = require('socket.io')(server);
const authMiddleware = require('./middleware/auth');
const routes = require('./routes');
const session = require('express-session');
const memoryStore = require('session-memory-store')(session)();

mongoose.connect('mongodb://localhost/messenger');

app.use(cookieParser());
app.use(require('body-parser')
    .urlencoded({ extended: true }));

app.use(session({
    store: memoryStore,
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));

app.use('/static', express.static(path.resolve(__dirname, '../public')));

app.use(passport.initialize());
app.use(passport.session());

app.use(authMiddleware());

const nextApp = next({
    dir: './client',
    dev: process.env.NODE_ENV !== 'production'
});

const render = pageName => (req, res) => nextApp.render(req, res, `/${pageName}`); // eslint-disable-line no-unused-vars, max-len
const handleRequest = (req, res) =>
    nextApp.getRequestHandler()(req, res, parse(req.url, true));

const port = process.env.PORT || 3000;

io.use(passportSocketIo.authorize({
    store: memoryStore,
    secret: process.env.SECRET_KEY,
    passport,
    cookieParser
}));

nextApp.prepare()
    .then(() => {
        routes(app, io);
        app
            .get('*', handleRequest);
        server.listen(port, () => console.info(`> Ready on http://localhost:${port}`)); // eslint-disable-line no-console, max-len
    });
