var path = require('path');
var User = require(path.join(__dirname, '..', 'models', 'user'));

module.exports = function(passport, SQL) {

    passport.serializeUser(function(user, done){
        console.log('serializeUser: ' + user.id);
        done(null, user);
    });
    passport.deserializeUser(function(user, done){
        console.log("deserializeUser called", user);
        // // User.findById(id, function (err, user) {
        // var user = {
        //     id: 1,
        //         username: 'hungpd@tinhvan.com',
        //         fist_name: 'hung',
        //         last_name: 'phung danh',
        //         email: 'hungpd@tinhvan.com',
        //         gen: 'F',
        //         bid: '02111985',
        //         profile: 'abc',
        //         picture: 'abc',
        //         last_login: '2017-07-17T03:20:23.000Z',
        //         status: '1' };
        var err = null;
            done(err, user);
        // });
    });

    // Load strategy files
    require(path.join(__dirname, 'strategies', 'local-strategy'))(passport, SQL);
    //TODO: Facebook

    //TODO: Twitter

    //TODO: Google
}