/** @jsx React.DOM */
var React = require('react');

var List = React.createClass({
    render: function() {
        var meetings = this.props.items.map(function(meeting){
            return <div>{meeting.name}{' '}{meeting.day}{' '}{meeting.language}{' '}{meeting.city}</div>
        })

        return <div>{meetings}</div>;
    }


});

module.exports = List;