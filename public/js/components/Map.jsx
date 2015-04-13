/** @jsx React.DOM */
    //TODO:  CAN'T FIGURE OUT HOW TO GET MAP TO WORK IN SEPARATE COMPONENT.  this doesnt work
var React = require('react');

var Map = React.createClass({
    componentWillMount: function(){
        var options = this.props.options;
        if (options){
            var map = new google.maps.Map(document.getElementById('map-canvas'), options);
        }
    },
    render: function() {
        var options = this.props.options;
        if (options){
            var map = new google.maps.Map(document.getElementById('map-canvas'), options);
        }
        //var mapOptions = {
        //    center: { lat: options.latitude, lng: options.longitude },
        //    zoom: options.zoomLevel
        //};

        //var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        return <div>ddd</div>;
    }


});

module.exports = Map;
