var express = require('express');
var app = express();
var routes = require('./routes/routes.js');
app.use('/dist', express.static(__dirname + '/dist'));
var MongoClient = require('mongodb').MongoClient
var connString = 'mongodb://localhost:27017/finder';
MongoClient.connect(connString, function(err, db) {
    "use strict";
    if(err) throw err;
    console.log('mongo db started');
    routes(app, db);
    app.listen(3000);
});



