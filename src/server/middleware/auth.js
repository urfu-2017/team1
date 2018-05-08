'use strict';

const cloudinary = require('cloudinary');
const passport = require('passport');
const User = require('../model/user');
const GitHubStrategy = require('passport-github').Strategy;

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
        let user = null;
        let failed = true;
        // TODO: or not to do
        for (let i = 0; i < 5; i++) {
            try {
                user = await User.findByGithubID(githubId);
                failed = false;
                break;
            } catch (exc) { }
        }
        if (failed) throw new Error('Network error');

        if (!user) {
            const pictureBase64 = await getPictureInBase64(githubId);
            const avatarData = `data:image/png;base64,${pictureBase64}`;
            const promise = new Promise(resolve => {
                cloudinary.uploader.upload(avatarData, data => {
                    resolve(data);
                });
            });
            const data = await promise;
            user = await User.create(name, data.secure_url, githubId);
        }

        cb(null, user);
    })
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('deserializeUser');
    const user = await User.findByID(id);
    done(null, user);
});

module.exports = (req, res, next) => {
    console.log(req.url);
    if (req.user || req.url.startsWith('/auth') || req.url.startsWith('/static') || req.url.startsWith('/_next')) {
        next();
    } else {
        res.redirect('/auth');
    }
};
