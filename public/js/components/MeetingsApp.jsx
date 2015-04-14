/** @jsx React.DOM */
var React = require('react');
var Form = require('./Form.jsx');
var List = require('./List.jsx');

//when component loads on startup, fetches items based on proximity to current location
//subsequent fetches recenter the map based on the first marker, based on sort

var MeetingsApp = React.createClass({
    getDefaultProps: function() {
        return {
            //meetings: getMeetingsState(),
            filterValues: {
                language: 'English'
            },
            urlSearch: '/search'
        };
    },
    getInitialState: function(){
        return {
            filteredMeetings: []
        };
    },
    onFilter: function(filters){
        this.submitFilterValues(filters);
    },
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
                this.loadMap();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    loadMap: function(){
        //var options = this.state.currentLocation;
        var center = this.state.filteredMeetings[0].location;
        this.map = new google.maps.Map(document.getElementById('map-canvas'));
        //set the bounds of the map
        var bounds = new google.maps.LatLngBounds();

        //add a marker to map for each location
        this.state.filteredMeetings.forEach(function(meeting){
            var markerPosition = new google.maps.LatLng(meeting.location[1], meeting.location[0]);
            var marker = new google.maps.Marker({
                position: markerPosition,
                map: this.map,
                title: meeting.name + '<br/>' + meeting.startTime + '<br/>' + meeting.day
            });
            bounds.extend(marker.getPosition());
        }, this);
        this.map.setCenter(bounds.getCenter());
        this.map.fitBounds(bounds);
        this.map.setZoom(this.map.getZoom() - 1);

    },
    filterByLocation: function(){

    },
    getGeoLocation: function(){
        //console.log('get geo');
        var that = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var location = {
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude)
                };
                that.setState({currentLocation: location});
                //to search by location in mongo, loc needs to be [x, y]
                var filters = {
                    location: [ location.longitude, location.latitude ]
                };
                that.submitFilterValues(filters);
                //that.loadMap(mapConfig);
            }, function(error) {
                console.log('geoloc error');
            },{timeout:10000});
        }
        //else
    },
    componentWillMount: function(){
        this.getGeoLocation();
    },

    render: function() {
        return (
            <div>
                <Form filters={this.props.filterValues} submit={this.onFilter}/>
                <List items={this.state.filteredMeetings} />
            </div>

        );
    }
});

module.exports = MeetingsApp;