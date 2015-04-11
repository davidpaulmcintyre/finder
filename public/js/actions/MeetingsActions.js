var MeetingsDispatcher = require('../dispatcher/MeetingsDispatcher');
var MeetingsConstants = require('../constants/MeetingsConstants');

var MeetingsActions = {

    test: function(text) {
        MeetingsDispatcher.dispatch({
            actionType: MeetingsConstants.MEETINGS_TEST,
            text: text
        });
    },

    filter: function(id, text) {
        MeetingsDispatcher.dispatch({
            actionType: MeetingsConstants.MEETINGS_FILTER,
            id: id,
            text: text
        });
    }

};

module.exports = MeetingsActions;
