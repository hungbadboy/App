var path = require('path');
var User = require(path.join(__dirname, '..', 'models', 'user'));

module.exports = function(passport) {

    passport.serializeUser(function(user, done){
        done(null, false);
    });
    passport.deserializeUser(function(id, done){
        console.log("deserializeUser called", id);
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // Load strategy files
    require(path.join(__dirname, 'strategies', 'local-strategy'))(passport);
    //TODO: Facebook

    //TODO: Twitter

    //TODO: Google
}