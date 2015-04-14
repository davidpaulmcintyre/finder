//var http = require('http');
var MongoClient = require('mongodb').MongoClient;

var connString = 'mongodb://localhost:27017/finder';
MongoClient.connect(connString, function(err, db) {
    "use strict";
    if(err) throw err;
    console.log('geocode generation script started');

    var latMax = 42.6;
    var latMin = 42.0;
    var latRange = latMax - latMin;
    var lngMax = -71.4;
    var lngMin = -71;
    var lngRange = lngMin - lngMax;
    var cursor = db.collection('meetings').find({ location: { $exists: false } });
    cursor.forEach(function(doc){

        var lat = Math.random() * latRange + latMin;
        var lng = Math.random() * lngRange + lngMax;
        db.collection('meetings').update({ _id: doc._id}, { $set: { location: [ lng, lat ] } });
        console.log('updated ' + doc._id + ' ' + lat + ' ' + lng);
    })
});