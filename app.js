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

app.param('id',function (req, res, next, id) {
    if(isNaN(+id)){
        res.send('<h1>User ID should be a number</h1>');
    } else{
        next();
    }
});

app.get('/users/:id', function(req, res, next){
    // we have access to route parameters throuth object req.params
    res.end('<h1>Page of user #' + req.params.id + '</h1>')
});



module.exports = app;
