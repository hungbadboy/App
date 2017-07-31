var express = require('express');
var passport = require('passport');
var path = require('path');
var firebase = require("firebase");
var router = express.Router();
var User = require(path.join(__dirname, '..', 'models', 'user'));
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/login', function (req, res) {
    res.render('login', {user: req.user});
});
router.post('/login', function (req, res, next) {
    passport.authenticate('login',
        {
            successRedirect: '/admin/filter',
            failureRedirect: '/login'
        }, function (err, user, info) {
            if (err) {
                return res.render('index', {title: 'Sign In', errorMessage: err.message});
            }
            if (!user) {
                return res.render('index', {title: 'Sign In', errorMessage: info.message});
            }
            return req.logIn(user, function (err) {
                if (err) {
                    return res.render('index', {title: 'Sign In', errorMessage: err.message});
                } else {
                    return res.redirect('/admin/users');
                }
            });
        })(req, res, next);
});
router.get('/logout', function (req, res, next) {
    req.logout();
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
});
router.get('/register', function (req, res) {
    res.render('signup', {});
});
router.post('/signup', function (req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function (err, account) {
        if (err) {
            return res.render('register', {account: account});
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get("/admin/users", isLoggedIn, function (req, res) {
    res.render('user', {'title': 'Login successful'});
});
function isLoggedIn(req, res, next) {
    console.log("This is the authentication middleware, is req authenticated?");
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}
// Authentication facebook
router.get('/auth/facebook', passport.authenticate('facebook'), function (res, res) {
});

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication, redirect home.
        return res.redirect('/admin/users');
    });

// Authentication google
router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        return res.redirect('/admin/users');
    });

module.exports = router;