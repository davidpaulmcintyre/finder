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
            //map: {
            //    latitude: 39.5,
            //    longitude: -98.35,
            //    zoomLevel: 4
            //}
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
            if (!filters.hasOwnProperty(filter)) return;
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
    loadMap: function(options){
        var mapOptions = {
            center: { lat: options.latitude, lng: options.longitude },
            zoom: options.zoomLevel
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    },
    getGeoLocation: function(){
        console.log('get geo');
        var that = this;
        var mapDefault = {
            latitude: 39.5,
            longitude: -98.35,
            zoomLevel: 4
        };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var mapConfig = {
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude),
                    zoomLevel: 11
                };
                //that.setProps({map: mapConfig});
                that.loadMap(mapConfig);
            }, function(error) {
                console.log('geoloc error');
                that.loadMap(mapDefault);
            },{timeout:10000});
        }else{
            console.log('not supported');
            that.loadMap(mapDefault);
        }
    },
    render: function() {
        this.getGeoLocation();
        return (
            <div>
                <Form filters={this.props.filterValues} submit={this.submitFilterValues}/>
                <List items={this.state.filteredMeetings} />
            </div>

        );
    }
});

module.exports = MeetingsApp;