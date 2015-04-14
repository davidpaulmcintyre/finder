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

    app.get('/search', function (req, res) {
        console.log('searching');
        meetings.getMeetings(req.query, function(err, results) {
            "use strict";

            if (err) console.log(err);

            res.json({"results": results});
        });
    });
}

module.exports = Router;