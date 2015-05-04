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