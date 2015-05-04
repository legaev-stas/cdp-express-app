var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cdp');

var schema = mongoose.Schema({
    firstName: String
})

var User = mongoose.model('User', schema);
var john = new User({
    firstName: 'John',
    lastName: 'Smith'
})

john.save(function (err, model) {
    if (err) return console.error(err);

    User.find(function (err, users) {
        if (err) return console.error(err);

        console.log(users)
    })
});