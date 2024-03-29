const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
    User.findOne({email: email}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            done(null, false);
        }
        user.comparePassword(passport, function (err, isMatch) {
            if (err) {
                return done(err)
            }
            if (!isMatch) {
                return done(null, false);
            }

            return done(null, user);
        })
    })
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    User.findById(payload.sub, function (err, user) {
        if (err) {
            return done(err, false);
        }

        user ? done(null, user) : done(null, false);
    })
});

passport.use(jwtLogin);
passport.use(localLogin);