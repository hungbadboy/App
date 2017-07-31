var path = require('path');
var FacebookStrategy = require('passport-facebook').Strategy;
var env = process.env.NODE_ENV || "development";
var options = require(path.join(__dirname, '..', 'config.json'))[env].facebook;
module.exports = function (passport, SQL, dbUtil) {
    passport.use(new FacebookStrategy(options,
        function (accessToken, refreshToken, profile, cb) {
            console.log('accessToken: ', accessToken);
            dbUtil.select(SQL.FIND_USER_BY_FBID,[profile.id], null, function (err, user) {
                return cb(err, user[0]);
            });
        }
    ));
};