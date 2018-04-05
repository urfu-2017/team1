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

const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });

const render = pageName => (req, res) => nextApp.render(req, res, `/${pageName}`);
const handleRequest = (req, res) =>
    nextApp.getRequestHandler()(req, res, parse(req.url, true));

const port = process.env.PORT || 3000;

io.on('connection', socket => {
    /* socket.on('answer', {
        message: 'Hallelujah!!!2!!!!'
    });*/
    setInterval(myFunc, 1000, socket);
    //myFunc(socket);
});

nextApp.prepare().then(() => {
    routes(app);
    app.get('*', handleRequest);
        //.listen(port, () => console.log(`Listening on http://localhost:${port}`));
        server.listen(port, () => console.info(`> Ready on http://localhost:${port}`));
});

function myFunc(socket) {
    socket.emit('now', {
        message: `Hallelujah!!${Math.random()}!1!!!!`
    });
}
