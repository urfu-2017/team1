'use strict';

const passport = require('passport');
const { saveNewMessage } = require('./controllers/message');
const { saveChat } = require('./controllers/chat');
const { MetadataController } = require('./controllers/metadata');

module.exports = (app, io) => {
    app.get('/auth/github', passport.authenticate('github'));
    app.get(
        '/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/auth' }),
        (req, res) => {
            res.redirect('/index');
        }
    );

    app.post('/metadata', MetadataController.post);

    io.on('connection', socket => {
        app.post('/message', saveNewMessage(socket));
        //app.post('/chat', saveChat(socket));
    });
};
