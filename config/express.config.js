app.use(session({
    store: new MongoStore({
        url: 'mongodb://' + config.url + ':' + config.port + '/' + config.name
    }),
    secret: 'secretkey',
    key: 'skey.sid',
    resave: false,
    saveUninitialized: false,
    cookie : {
        maxAge: 604800000 //7 days in miliseconds
    }
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next) {
    req.resources = req.resources || {};
    // res.locals.app = config.app;
    res.locals.currentUser = req.user;
    res.locals._t = function (value) { return value; };
    res.locals._s = function (obj) { return JSON.stringify(obj); };
    next();
});