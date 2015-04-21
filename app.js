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

app.use(function(req, res, next){
    res.end('<h1>It works!</h1>')
});

module.exports = app;
