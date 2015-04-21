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

// this will be invoked whenewer BASE of URL matches to '/users'
app.use('/users', function(req, res, next){
    console.log('base was matched so app.use was invoked');
    next();
});

// this will be invoked to all request methods at path '/users/request'
app.all('/users/request', function(req, res, next){
    console.log('app.all method intercepts all methods for particular path');
    next();
});

app.get('/users/request', function(req, res, next){
    res.end('<h1>GET request finished successfully!</h1>')
});

app.post('/users/request', function(req, res, next){
    res.end('POST request finished successfully!')
});


module.exports = app;
