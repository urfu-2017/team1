'use strict';

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.URL}/auth/github/callback`
  },
  function(accessToken, refreshToken, profile, cb) {
    // Нужна модель пользователя для того чтобы его создавать
    // Пример:
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //     return cb(err, user);
    // });
    cb(null, profile)
  }
));

passport.serializeUser(function(user, done) {
    //когда будет модель пользоватея 
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = () => {
    return (req, res, next) => {
        if (req.user || req.url.startsWith('/auth')) {
            next();
        } else {
            res.redirect('/auth');
        }
    }
}