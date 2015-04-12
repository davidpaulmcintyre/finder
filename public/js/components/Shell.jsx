/** @jsx React.DOM */
var React = require('react');
var MeetingsApp = require('./MeetingsApp.jsx');

var Shell = React.createClass({
    render: function() {
        return (
            <div>
                <MeetingsApp />
            </div>

        );
    }
});

module.exports = Shell;