var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
console.log(bcrypt.hashSync('1'));
module.exports = function (passport, SQL, dbUtil) {
    console.log("LocalStrategy called");
    passport.use('login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, username, password, done) {
            console.log('Authenticate');
            dbUtil.select(SQL.FIND_USER_BY_USERNAME, [username], null, function (err, data) {
                if (err) {
                    return done(err);
                }

                if (!data.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }

                if(!bcrypt.compareSync(password, data[0].password)) {
                    return done(null, false, req.flash('loginMessage', 'Wrong username or password.'));
                }

                return done(err, data[0]);
            });

        })
    );
};