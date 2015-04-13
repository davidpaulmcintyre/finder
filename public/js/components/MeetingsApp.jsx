/** @jsx React.DOM */
var React = require('react');
var Form = require('./Form.jsx');
var List = require('./List.jsx');
//var Map = require('./Map.jsx');
var MeetingsStore = require('../stores/MeetingsStore');
//var MeetingsActions = require('../actions/MeetingsActions');

function getMeetingsState() {
    return MeetingsStore.getAll();
}
var MeetingsApp = React.createClass({
    getDefaultProps: function() {
        return {
            meetings: getMeetingsState(),
            filterValues: {
                language: 'English'
            },
            urlSearch: '/search'
        };
    },
    getInitialState: function(){
        return {
            filteredMeetings: [] //this.filterMeetings()
        };
    },
    //filterMeetings: function(){
    //    var filtered = this.props.meetings;
    //    var filters = this.props.filterValues;
    //    for (var filter in filters){
    //        if (!filters.hasOwnProperty(filter)) return;
    //        var filterValue = filters[filter];
    //        if (filterValue && filterValue.length > 0){
    //            filtered = filtered.filter(function(meeting){
    //                return meeting[filter] == filterValue;
    //            })
    //        }
    //    }
    //    return filtered;
    //},
    submitFilterValues: function(filters){
        this.props.filterValues = filters;
        $.ajax({
            type: 'get',
            data: this.props.filterValues,
            url: this.props.urlSearch,
            dataType: 'json',
            success: function(data) {
                console.log('filter success');
                this.setState({'filteredMeetings': data.results});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        //this.filterMeetings();
        //var filtered = this.filterMeetings();
        //this.setState({'filteredMeetings': filtered});
    },
    loadMap: function(){
        var options = this.state.map;
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
                that.setState({map: mapConfig});
                that.loadMap(mapConfig);
            }, function(error) {
                console.log('geoloc error');
                that.setState({map: mapConfig});
                that.loadMap();
            },{timeout:10000});
        }else{
            that.setState({map: mapConfig});
           that.loadMap();
        }
    },
    componentWillMount: function(){
        this.getGeoLocation();
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