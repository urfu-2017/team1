const { parse } = require('url');

require('dotenv').config();
const next = require('next');
const passport = require('passport');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const authMiddleware = require('./middleware/auth');
const routes = require('./routes');

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: process.env.SECRET_KEY, resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(authMiddleware());

const nextApp = next({ dir: './client', dev: process.env.NODE_ENV !== 'production' });

const render = pageName => (req, res) => nextApp.render(req, res, `/${pageName}`);
const handleRequest = (req, res) =>
    nextApp.getRequestHandler()(req, res, parse(req.url, true));

const port = process.env.PORT || 3000;

io.on('connection', socket => {
    setInterval(myFunc, 1000, socket);
});

nextApp.prepare().then(() => {
    routes(app);
    app.get('*', handleRequest);
    server.listen(port, () => console.info(`> Ready on http://localhost:${port}`));
});

function myFunc(socket) {
    console.log('все работает');
    socket.emit('now-ALPHANUMEfRIC_ID', {

        message: `Первый!!${Math.random()}!1!!!!`
    });

    socket.emit('now-ALPHANUMERIC_ID', {

        message: `Второй!!${Math.random()}!1!!!!`
    });
}
