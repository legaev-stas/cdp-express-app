var uuid= require('node-uuid');

var db = [{
    id: 'd893de00-ea75-11e4-8f91-cf45b81db2b0',
    firstName: 'Stas',
    lastName: 'Legaev',
    company: 'EPAM',
    position: 'CEO',
    email: 'legaev_stas@epam.com',
    phoneNumber: '+380666294546'
}, {
    id: 'd9413500-ea75-11e4-8f91-cf45b81db2b0',
    firstName: 'Alex',
    lastName: 'Hall',
    company: 'TEST',
    position: 'Sys. Admin',
    email: 'ahall@test.com',
    phoneNumber: '+456657895416'
}];


module.exports = {
    getCollection: function(){
        return db;
    },
    get: function(id){
        return db.filter(function(entry){
            return entry.id === id;
        })[0];
    },
    add: function(model, cb){
        model = JSON.parse(JSON.stringify(model));
        model.id = uuid.v1();
        db.push(model);

        cb(null, model);
    },
    update: function(id, model, cb){
        model = JSON.parse(JSON.stringify(model));

        var matchedModel = db.filter(function(entry){
            return entry.id === id;
        })[0];

        if(matchedModel){
            db[db.indexOf(matchedModel)] = model;
            cb(null, model);
        } else{
            cb(new Error('There is no such model'), null)
        }
    },
    remove: function(id, cb){
        var matchedModel = db.filter(function(entry){
            return entry.id === id;
        })[0];

        if(matchedModel){
            db.splice(db.indexOf(matchedModel), 1)
            cb(null);
        } else{
            cb(new Error('There is no such model'))
        }
    }
};