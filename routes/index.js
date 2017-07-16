var express = require('express');
var path = require('path');
var router = express.Router();
var User = require(path.join(__dirname, '..', 'models', 'user'));

module.exports = function (passport) {

    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('index', {title: 'Express'});
    });

    router.get('/login', function (req, res) {
        res.render('login', {user: req.user});
    });

    router.post('/login', function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        passport.authenticate('login', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }),
            function (req, res) {
                res.redirect('/');
            };
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
    return router;
};