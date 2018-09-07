const Mongoose = require('mongoose');

//load database
Mongoose.connect('mongodb://localhost/hapi-api');

var db = Mongoose.connection;

Mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function callback() {
   console.log('Connection with database succeeded.');
});

exports.db = db;