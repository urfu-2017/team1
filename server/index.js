const { parse } = require('url');
const path = require('path');

require('dotenv')
    .config();
const next = require('next');
const passport = require('passport');
const passportSocketIo = require('passport.socketio');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const restRoutes = require('./controllers/rest/routes');
const server = require('http')
    .Server(app);
const io = require('socket.io')(server);
const authMiddleware = require('./middleware/auth');
const setUpMiddleware = require('./middleware/userSetUp');
const metaInfoSetUpMiddleware = require('./middleware/metaInfoSetUp');
const routes = require('./routes');
const session = require('express-session');
const memoryStore = require('session-memory-store')(session)();

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
app.use(setUpMiddleware());
app.use(metaInfoSetUpMiddleware(process.env.URL));

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


io.on('connection', socket => {
    // console.log(socket.request.user);
    setInterval(myFunc, 1000, socket);
});


nextApp.prepare()
    .then(() => {
        routes(app, io);
        app
            .use('/api/rest', restRoutes)
            .get('*', handleRequest);
        server.listen(port, () => console.info(`> Ready on http://localhost:${port}`)); // eslint-disable-line no-console, max-len
    });

function myFunc(socket) {
    socket.emit('now-ID_1', {
        message: {
            content: {
                text: `Первый!!${Math.random()}!1!!!!`
            },
            chatId: 'ID_1',
            senderId: 'sender_1'
        }
    });

    socket.emit('now-ID_2', {
        message: {
            content: {
                text: `Второй!!${Math.random()}!1!!!!`
            },
            chatId: 'ID_2',
            senderId: 'sender_2'
        }
    });

    socket.emit('userff', {
        chat: {
            title: 'Chat1',
            picture: 'picture1',
            usersIds: [],
            id: `${Math.random()}-8812-4f37-9221-0176447b9ee1`,
            messages: [],
            lastMessage: {
                content: {
                    text: 'message text',
                    attachments: [],
                    pictures: []
                },
                sender: {
                    name: 'user1',
                    avatar: 'path-to-avatar.jpeg',
                    id: 'ALPHANUMERIC_ID'
                }
            }
        }
    });
}
