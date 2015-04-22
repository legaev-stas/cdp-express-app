var express = require('express');
var app = express();

app.use(function(req, res, next){
    var date = new Date();
    console.log('%s %s Recevded request:\n\t%s: %s',
        date.toLocaleDateString(),
        date.toLocaleTimeString(),
        req.method,
        req.url);

    next();
});

app.get('/', function(req, res, next){
    res.end('<h1>Home page</h1>')
});

app.get('/users', function(req, res, next){
    res.end('<h1>Users page</h1>')
});


// 404 error handler should be the last in order of middleware
app.use(function(req, res){
    res.statusCode = 404;
    res.end('<h1>Not Found</h1>')
});

module.exports = app;