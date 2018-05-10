'use strict';

require('dotenv').config();
const express = require('express');
const dbConnection = require('../db-connection');

const router = express.Router();


router.get('/invite/:id', (req, res) => res.redirect(`/?invite=${req.params.id}`));

router.get('/', async (req, res, next) => {
    const { invite } = req.query;
    if (invite) {
        await dbConnection.addUserToChat(req.user.id, invite);
        req.state.localState.currentChatId = invite;
    }
    next();
});


module.exports = router;
