// const passport =require("passport")
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
// const dotenv = require('dotenv')
// dotenv.config()

// passport.serializeUser(function(user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//         done(null, user);
// });

// passport.use(new GoogleStrategy({
//     scope: ['openid','profile', 'email'],
//         clientID:process.env.GOOGLE_CLIENT_ID,
//         clientSecret:process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "http://localhost:5000/auth/google/callback",
//         passReqToCallback   : true,
//         // scope: ['profile', 'email'],
//     },
//     function(request, accessToken, refreshToken, profile, done) {
//             return done(null, profile);
//     }
// ));

// // require('dotenv').config()
// // const passport =require("passport")
// // const GoogleStrategy = require('passport-google-oauth2').Strategy;


// // passport.use(new GoogleStrategy({
// //         clientID: process.env.clientID,
// //         clientSecret: process.env.clientSecret,
// //         callbackURL: "http://localhost:5000/google/callback",
// //         passReqToCallback   : true
// // },
// // function(request, accessToken, refreshToken, profile, done) {
// //         return done(null, profile);
// // }
// // ));

// // passport.serializeUser(function(user, done) {
// // done(null, user);
// // });

// // passport.deserializeUser(function(user, done) {
// // done(null, user);
// // });