var MeetingsDispatcher = require('../dispatcher/MeetingsDispatcher');
var EventEmitter = require('events').EventEmitter;
var MeetingsConstants = require('../constants/MeetingsConstants');
var assign = require('object-assign');

var _meetings = [
    {
        name: 'Test name',
        day: 'Tuesday',
        language: 'Spanish',
        city: 'boston',
        zip: '02155',
        'street-address': '123 Main St'
    },
    {
        name: 'Testdsfsd name',
        day: 'Tuesday',
        language: 'Spanish',
        city: 'boston',
        zip: '02155',
        'street-address': '123 Main St'
    },
    {
        name: 'Test name1221',
        language: 'Spanish',
        day: 'Wednesday',
        city: 'medford',
        zip: '02158',
        'street-address': '12 Iaj St'
    },
    {
        name: 'sddd sdfsd dd',
        language: 'English',
        day: 'Saturday',
        city: 'medford',
        zip: '02158',
        'street-address': '12 Iaj St'
    },
    {
        name: 'Test dkkdkdk',
        language: 'English',
        day: 'Thursday',
        city: 'Boston',
        zip: '02158',
        'street-address': '12 Iaj St'
    },
    {
        name: 'Test name555',
        language: 'Portuguese',
        day: 'Monday',
        city: 'somerville',
        zip: '02153',
        'street-address': '123 Tremont St'
    }
];

function filter(filterText){
    return _meetings.filter(function(item){
        return item === filterText;
    })

}
var MeetingsStore = assign({}, EventEmitter.prototype, {

    getAll: function() {
        return _meetings;
    },
    filter: function(){
        return _meetings;
    }
});

// Register callback to handle all updates
MeetingsDispatcher.register(function(action) {
    var text;

    switch(action.actionType) {

        case MeetingsConstants.MEETINGS_FILTER:
            filter();
            MeetingsStore.emitChange();
            break;

        default:
        // no op
    }
});

module.exports = MeetingsStore;
