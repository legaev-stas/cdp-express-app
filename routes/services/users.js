var express = require('express');
var router = express.Router();

var db = require('../../db/db');
var User = require('../../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find(function(err, matchedUsers){
        if(err){
            res.end(500)
        } else{
            res.json(matchedUsers);
        }
    })
});

/* GET particular user by ID */
router.get('/:id', function(req, res, next) {
    res.json(db.get(req.params.id));
});

/* create user */
router.post('/', function(req, res, next) {
    User.create(req.body, function (err, user) {
        if(err){
            res.end(500)
        } else{
            res.json(user);
        }
    })
});

/* update user entry */
router.put('/:id', function(req, res, next) {
    db.update(req.params.id, req.body, function(err, model){
        if(err){
            res.end(500)
        } else{
            res.json(model);
        }
    })
});

/* delete user entry */
router.delete('/:id', function(req, res, next) {
    db.remove(req.params.id, function(err){
        if(err){
            res.end(500)
        } else{
            res.send(200);
        }
    })
});

/* handle all unsupported methods */
router.all('/', function(req, res, next) {
    res.send('Request method is not supported');
});

module.exports = router;
