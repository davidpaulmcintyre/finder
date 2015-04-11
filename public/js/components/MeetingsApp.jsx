/** @jsx React.DOM */
var React = require('react');
var Form = require('./Form.jsx');
var List = require('./List.jsx');
var MeetingsStore = require('../stores/MeetingsStore');
var MeetingsActions = require('../actions/MeetingsActions');

function getMeetingsState() {
    return MeetingsStore.getAll();
}
var MeetingsApp = React.createClass({
    getDefaultProps: function() {
        return {
            meetings: getMeetingsState(),
            filterValues: {
                language: 'English'
            }
        };
    },
    getInitialState: function(){
        return {
            filteredMeetings: this.filterMeetings()
        };
    },
    filterMeetings: function(){
        var filtered = this.props.meetings;
        var filters = this.props.filterValues;
        for (var filter in filters){
            var filterValue = filters[filter];
            if (filterValue && filterValue.length > 0){
                filtered = filtered.filter(function(meeting){
                    return meeting[filter] == filterValue;
                })
            }
        }
        return filtered;
    },
    submitFilterValues: function(filters){
        this.props.filterValues = filters;
        var filtered = this.filterMeetings();
        this.setState({'filteredMeetings': filtered});
    },
    render: function() {

        return (
            <div>
                <Form filters={this.props.filterValues} submit={this.submitFilterValues}/>
                <List items={this.state.filteredMeetings} />
            </div>

        );
    }
});

module.exports = MeetingsApp;