var mongoose = require('../db/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    firstName: String,
    lastName: String,
    company: String,
    position: String,
    email: String,
    phoneNumber: String
});

schema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});

schema.set('toJSON', {
    transform: function(doc, ret, options){
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('User', schema);