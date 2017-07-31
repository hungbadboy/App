var path = require('path');
var dbUtil = require(path.join(__dirname, '..', 'utils', 'dbUtil'));

module.exports = function(passport, SQL) {

    passport.serializeUser(function(user, done){
        console.log('serializeUser: ' + user.id);
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done){
        console.log("deserializeUser called", id);
        var query = 'SELECT * FROM user WHERE id=?';
        dbUtil.select(query, [id], null, function (err, data) {
            done(null, data[0]);
        });

    });

    // Load strategy files
    require(path.join(__dirname, 'strategies', 'local-strategy'))(passport, SQL, dbUtil);
    //TODO: Facebook
    require(path.join(__dirname, 'strategies', 'facebook-strategy'))(passport, SQL, dbUtil);
    //TODO: Twitter

    //TODO: Google
    require(path.join(__dirname, 'strategies', 'google-strategy'))(passport, SQL, dbUtil);
}