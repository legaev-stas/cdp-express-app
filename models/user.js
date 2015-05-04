var mongoose = require('../db/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    company: {
        type: String
    },
    position: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    }
});

schema.methods.greetUser = function(){
    return 'Welcome ' + this.firstName + ' ' + this.lastName;
}

schema.set('toJSON', {
    transform: function(doc, ret, options){
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
    }
});

var User =  mongoose.model('User', schema);
var john = new User({firstName: 'John', lastName: 'Smith'})
console.log(john.greetUser())


module.exports = mongoose.model('User', schema);