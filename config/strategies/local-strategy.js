var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var mongoose = require('mongoose');
//var User = mongoose.model('User');
module.exports = function () {
    console.log("LocalStrategy called");
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        function (username, password, done) {
            var user = {
                'name':'hungpd',
                'id': '1'
            };
            return done(null, user);
            // User.authenticate(username, password, function (err, user) {
            //     if (err) {
            //         return done(err);
            //     }
            //     if (!user) {
            //         return done(null, false, {message: 'Invalid username or password'});
            //     }
            //     return done(null, user);
            // });
        }));
};