var express = require('express');
var passport = require('passport');
var path = require('path');
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
                return res.render('login', {title: 'Sign In', errorMessage: err.message});
            }
            if (!user) {
                return res.render('login', {title: 'Sign In', errorMessage: info.message});
            }
            return req.logIn(user, function (err) {
                if (err) {
                    return res.render('login', {title: 'Sign In', errorMessage: err.message});
                } else {
                    return res.redirect('/admin/filter');
                }
            });
        })(req, res, next);
});
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
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

router.get("/admin/filter", isLoggedIn, function (req, res) {
//rendering stuff here
    res.render('user', {'title': 'Login successful'});
});
function isLoggedIn(req, res, next) {
    console.log("This is the authentication middleware, is req authenticated?");
    if (req.isAuthenticated()) {
        return next();
    } else {
        // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
        res.redirect('/');
    }
}
module.exports = router;