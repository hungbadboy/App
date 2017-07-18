var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var passport = require('passport');
var index = require('./routes/index');
var users = require('./routes/users');
var session = require('express-session');
var SQL = require(path.join(__dirname, 'utils','sql-mapping'));
var app = express();

// init database
require(path.join(__dirname, 'config','initDB'));
require(path.join(__dirname, 'config','auth-config'))(passport, SQL); //Load passport config

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1); // trust first proxy
app.use(session(
    { secret: 'keyboard cat',
        resave: false,
        saveUninitialized:true,
        cookie: { httpOnly: true, maxAge: 2419200000, secure: false }
    })); // session secret
app.use(passport.initialize());
app.use(passport.session());


// ROUTER
app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
