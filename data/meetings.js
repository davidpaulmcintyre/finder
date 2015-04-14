/* The MeetingsDAO must be constructed with a connected database object */
function MeetingsDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof MeetingsDAO)) {
        console.log('Warning: MeetingsDAO constructor called without "new" operator');
        return new PostsDAO(db);
    }

    var meetings = db.collection("meetings");

    if (!(this.getMeetings = function (queryStr, callback) {
            "use strict";
            var query = {};
            for (var item in queryStr) {
                if (queryStr.hasOwnProperty(item)) {
                    var _value = queryStr[item];
                    if (_value && _value.length > 0) {
                        if (item === 'location'){
                            query['location'] = {
                                $near: [parseFloat(_value[0]), parseFloat(_value[1])],
                                $maxDistance: 10000
                            }
                        } else {
                            query[item] = _value;
                        }
                    }
                }
            }
            meetings.find(query).limit(20).toArray(function (err, items) {
                "use strict";

                if (err) return callback(err, null);

                console.log("Found " + items.length + " meetings");

                callback(err, items);
            });
        })) {

    }
}

module.exports.MeetingsDAO = MeetingsDAO;