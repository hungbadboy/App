var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var path = require('path');
var env = process.env.NODE_ENV || "development";
var options = require(path.join(__dirname, '..', 'config.json'))[env].google;
module.exports = function (passport, SQL, dbUtil) {
    passport.use(new GoogleStrategy(options,
        function(accessToken, refreshToken, profile, done) {
            dbUtil.select(SQL.FIND_USER_BY_GOOGLEID,[profile.id], null, function (err, user) {
                return done(err, user[0]);
            });
        }
    ));
};