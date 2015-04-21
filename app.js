var express = require('express');
var app = express();

app.use(/* '/', */ function(req, res, next){
    var date = new Date();
    console.log('%s %s Recevded request:\n\t%s: %s',
        date.toLocaleDateString(),
        date.toLocaleTimeString(),
        req.method,
        req.url);

    next();
});

app.use('/home', function(req, res, next){
    res.end('<h1>Home page</h1>')
});
app.use('/users', function(req, res, next){
    res.end('<h1>Users page</h1>')
});


module.exports = app;
