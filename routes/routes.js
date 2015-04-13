var express = require('express');
var router = express.Router();
//var ContentHandler = require('./content');
var MeetingsDAO = require('../data/meetings').MeetingsDAO;
var root = process.cwd();


function Router(app, db) {
    var meetings = new MeetingsDAO(db);

    app.get('/', function (req, res) {
        res.sendFile(root + '/dist/index.html');
    });

    //app.get('/test', function (req, res) {
    //    console.log('test');
    //    res.send('qqq');
    //});

    app.get('/search', function (req, res) {
        console.log('searching');
        meetings.getMeetings(req.query, function(err, results) {
            "use strict";

            if (err) console.log(err);// return next(err);

            res.json({"results": results});
        });
    });

    //app.post('/meetings', function (req, res) {
    //
    //    res.json({'foo': 123});
    //});
    //
    //app.post('/', function (req, res) {
    //
    //    console.log('post: ' + req.url);
    //});
}

module.exports = Router;