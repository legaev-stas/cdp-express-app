var express = require('express');
var router = express.Router();

var db = require('../../db/db');
var User = require('../../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
    var query = User.find()
        .sort((req.query.sortDir === 'asc' ? '' : '-') + req.query.sortBy);

    query.count(function(err, count){
        query.skip(req.query.perPage * (req.query.offset - 1))
        .limit(req.query.perPage)
        .exec('find', function(err, matchedUsers){
            if(err){
                res.end(500)
            } else{
                res.json({
                    collection: matchedUsers,
                    total: count
                });
            }
        })
    })
});

/* GET particular user by ID */
router.get('/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user){
        if(err){
            res.end(500)
        } else{
            res.json(user);
        }
    })
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
    User.findByIdAndUpdate(req.params.id, req.body, function(err, model){
        if(err){
            res.end(500)
        } else{
            res.json(model);
        }
    })
});

/* delete user entry */
router.delete('/:id', function(req, res, next) {
    User.findByIdAndRemove(req.params.id, function(err, model){
        if(err){
            res.end(500)
        } else{
            res.sendStatus(200);
        }
    })
});

/* handle all unsupported methods */
router.all('/', function(req, res, next) {
    res.send('Request method is not supported');
});

module.exports = router;
