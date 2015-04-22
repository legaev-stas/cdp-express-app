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

// multiple middlewates at one mount point
app.get('/users/:id', function(req, res, next){
    console.log('multiple CB1')
    next()
}, function(req, res, next){
    console.log('multiple CB2')
    next('route')
}, function(req, res, next){
    console.log('multiple CB3')
    next()
})

app.get('/users/:id', function(req, res, next){
    // we have access to route parameters throuth object req.params
    res.end('<h1>Page of user #' + req.params.id + '</h1>')
});



module.exports = app;
