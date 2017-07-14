var express = require('express');
var router = express.Router();
var User = require(path.join(__dirname, '..', 'models', 'user'));
var passport = require('passport');

/* GET home page. */

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    passport.authenticate('local', {failureRedirect: '/login'}),
        function (req, res) {
            res.redirect('/');
        };
});

router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});
module.exports = router;
