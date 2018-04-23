'use strict';

const fs = require('fs');

const passport = require('passport');
const User = require('../model/user');
const GitHubStrategy = require('passport-github').Strategy;

const { getPathToGeneratedPicture } = require('../lib/avatar-generation');


passport.use(new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.URL}/auth/github/callback`
    },
    (async (accessToken, refreshToken, profile, cb) => {
        const githubId = profile.id;
        const name = profile.displayName || profile.username;
        let user = await User.findByGithubID(githubId);  // TODO: если запрос не удался из-за сетевой ошибки, то что?
        const avatarPath = `images/avatars/github/${githubId}.png`;
        const fsAvatarPath = `../../public/${avatarPath}`;
        if (!fs.existsSync(fsAvatarPath)) {
            getPathToGeneratedPicture(fsAvatarPath, githubId);
        }
        if (!user) {
            console.log(user)
            user = await User.create(name, `/static/${avatarPath}`, githubId);
        } //else {
          //  await user.update({ name });
        //}
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
    if (req.user || req.url.startsWith('/auth') || req.url.startsWith('/static')) {
        next();
    } else {
        res.redirect('/auth');
    }
};
