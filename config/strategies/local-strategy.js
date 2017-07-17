var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var dbUtil = require(path.join(__dirname, '..', '..', 'utils', 'dbUtil'));

module.exports = function (passport, SQL) {
    console.log("LocalStrategy called");
    passport.use('login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, username, password, done) {
            console.log('Authenticate');
            dbUtil.select(SQL.FIND_USER_BY_USERNAME, [username], null, function (err, data) {
                console.log(data);
                var user = data;
                if(user === null) {
                    return done(null, false, {message: 'Invalid username or password'});
                } else {
                    user = data[0];
                    if(!bcrypt.compareSync(password, user.password)) {
                        return done(null, false, {message: 'Invalid username or password'});
                    } else {
                        return done(null, user);
                    }
                }
                return done(err, user);
            });

        })
    );
};