//misc snippets to fix problems in the mongo docs

//var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var request = require('request');

var connString = 'mongodb://localhost:27017/finder';
MongoClient.connect(connString, function(err, db) {
    "use strict";
    if(err) throw err;
    console.log('cleanup script started');

    var cursor = db.collection('meetings').find({ location: { $exists: true } });
    cursor.forEach(function(doc){
        var longitude = parseFloat(doc.location[0]);
        var latitude = parseFloat(doc.location[1]);
        db.collection('meetings').update({ _id: doc._id}, { $set:{ location: [ parseFloat(longitude), parseFloat(latitude) ] } } );
        console.log('updated ' + doc._id);
    })
});
