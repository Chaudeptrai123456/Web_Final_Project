const passport = require('passport')
const googlePassport = require('passport-google-oauth2').Strategy
require('dotenv').config
passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})
passport.use(new googlePassport({
    clientID:process.env.CLIENT_ID_GOOGLE,
    clientSecret:process.env.CLIENT_SECRECT_GOOLE,
    callbackURL:'http://localhost:8080/user/authuser/callback',
    scope:['profile'],
    passReqToCallback: true
    },function(req,accessToken,refreshToken,profile,done) {
        return done(null,profile)
    }
))