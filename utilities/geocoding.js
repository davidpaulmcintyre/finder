//var http = require('http');
//THIS DOESNT WORK.  USED PYTHON SCRIPT INSTEAD
var MongoClient = require('mongodb').MongoClient;
var request = require('request');

var urlRoot = 'http://maps.googleapis.com/maps/api/geocode/json?address=';

function executeRequest(db, url, doc) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var data = JSON.parse(body);
            if (data.results && data.results.length > 0){
                var coordinates = data.results[0].geometry.location;
                var latitude = coordinates.lat;
                var longitude = coordinates.lng;

                db.collection('meetings').update({ _id: doc._id}, { location: [ longitude, latitude ] } );

                console.log('updated ' + doc._id);
            }
            //var latitude = data[0].geometry.location.lat;
            //var longitude = body.geometry.location.lng;
            //console.log(data);
        }
    })
}

var connString = 'mongodb://localhost:27017/finder';
MongoClient.connect(connString, function(err, db) {
    "use strict";
    if(err) throw err;
    console.log('geocoding script started');

    var cursor = db.collection('meetings').find({ location: { $exists: false } }).limit(10);
    cursor.forEach(function(doc){
        if (doc.address){
            var address = doc.address.replace(/ /g, '+') + '+' + doc.state;
            var url = urlRoot + address;
            //setTimeout(function(){ executeRequest(db, url, doc); }, 1000);
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {

                    var data = JSON.parse(body);
                    if (data.results && data.results.length > 0){
                        var coordinates = data.results[0].geometry.location;
                        var latitude = coordinates.lat;
                        var longitude = coordinates.lng;
                        console.log(latitude + ' ' + longitude);
                        db.collection('meetings').update({ _id: doc._id}, { location: [ longitude, latitude ] } );
                        console.log('updated ' + doc._id);
                    }
                }
            })
        }
});
});