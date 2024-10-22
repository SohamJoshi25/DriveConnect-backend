const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const refresh = require("passport-oauth2-refresh");
const passportCallBack = require("../controllers/controller.passport.js");
require("dotenv").config()

// Google Strategy
const googleStrategy = new GoogleStrategy({
    callbackURL: process.env.RedirectURL,
    clientID: process.env.ClientId,
    clientSecret: process.env.ClientSecret,
    accessType: 'offline',
    prompt: 'consent',
    passReqToCallback: true
},passportCallBack);


passport.use(googleStrategy);
refresh.use(googleStrategy);



// Serialize User
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize User
passport.deserializeUser((user, done) => {
    done(null, user);
});


