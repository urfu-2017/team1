'use strict';

const passport = require('passport');
const express = require('express');


const router = express.Router();
router.get('/auth/github', passport.authenticate('github'));
router.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/auth' }),
    (req, res) => {
        res.redirect('/index');
    }
);


module.exports = router;
