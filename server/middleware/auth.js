'use strict';

const fs = require('fs');
const path = require('path');

const passport = require('passport');
const User = require('../managers/user');
const GitHubStrategy = require('passport-github').Strategy;

const cloudinary = require('cloudinary');

const { getPictureInBase64 } = require('../lib/avatar-generation');


passport.use(new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.URL}/auth/github/callback`
    },
    (async (accessToken, refreshToken, profile, cb) => {
        const githubId = profile.id;
        const name = profile.displayName || profile.username;
        let user = await User.findByGithubId(githubId);
        if (!user) {
            const avatarData = `data:image/png;base64,${await getPictureInBase64(githubId)}`;
            const promise = new Promise((resolve, reject) => {
                cloudinary.uploader.upload(avatarData, data => {
                    resolve(data);
                });
            });
            const data = await promise;
            user = await User.create(name, githubId, data.secure_url);
        } else {
            await User.update(user._id, { name });
        }
        cb(null, user);
    })
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

module.exports = () => (req, res, next) => {
    if (req.user || req.url.startsWith('/auth') || req.url.startsWith('/static') || req.url.startsWith('/_next')) {
        next();
    } else {
        res.redirect('/auth');
    }
};
