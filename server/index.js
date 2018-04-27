const { parse } = require('url');
const path = require('path');

require('dotenv').config();
const next = require('next');
const passport = require('passport');
const passportSocketIo = require('passport.socketio');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const server = require('http').Server(app);
const io = require('socket.io')(server);

const authMiddleware = require('./middleware/auth');
const initialMiddleware = require('./middleware/initial');

const routes = require('./routes');
const session = require('express-session');
const memoryStore = require('session-memory-store')(session)();

const { socketHandlers } = require('./socket');

mongoose.connect(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}?authSource=admin`, {
    auth: {
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD
    }
});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

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

app.use(initialMiddleware(io, process.env.URL));

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
        socketHandlers(io);
        app
            .get('*', handleRequest);
        server.listen(port, () => console.info(`> Ready on http://localhost:${port}`)); // eslint-disable-line no-console, max-len
    });
