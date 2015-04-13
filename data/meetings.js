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

    if (!(this.getMeetings = function (filters, callback) {
            "use strict";
            console.log('filters = ' + filters);
            var query = {};
            for (var filter in filters) {
                if (filters.hasOwnProperty(filter)) {
                    var _value = filters[filter];
                    if (_value && _value.length > 0) {

                        query[filter] = _value;
                    }
                }
            }
            meetings.find(query).limit(50).toArray(function (err, items) {
                "use strict";

                if (err) return callback(err, null);

                console.log("Found " + items.length + " meetings");

                callback(err, items);
            });
        })) {

    }
}

module.exports.MeetingsDAO = MeetingsDAO;