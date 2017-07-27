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
var playVideo = require('./routes/play-video');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var env = process.env.NODE_ENV || "development";
var options = require(path.join(__dirname, 'config', 'config.json'))[env].db.connection;
options.checkExpirationInterval = 30000;
var sessionStore = new MySQLStore(options);
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
app.use(session(
    {
        secret: 'keyboard cat',
        store: sessionStore,
        resave: false, // The default value is true. If it is false that don't save session if unmodified
        saveUninitialized:false, // The default value is true
        // cookie: { httpOnly: true, //If it set true that will not allow client-side see the cookie in document.cookie
        //     maxAge: 2419200000,
        //     secure: false // If true when https
        // }
    })); // session secret
app.use(passport.initialize());
app.use(passport.session());


// ROUTER
app.use('/', index);
app.use('/users', users);
app.use('/video', playVideo);

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
