/** @jsx React.DOM */
var React = require('react');
var Griddle = require('griddle-react');
var List = React.createClass({
    render: function() {
        console.log('ITEMS = ' + this.props.items.length);
        var meetings = this.props.items;
        return (
            <Griddle results={meetings} columns={["name", "startTime", "day", "city", "isAccessible"]}/>
        )
    }

});

module.exports = List;