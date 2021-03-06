/** @jsx React.DOM */
var React = require('react');

var Form = React.createClass({
    getInitialState: function() {
        return {
            language: this.props.filters.language,
            day: this.props.filters.day
        };
    },
    filter: function(e) {
        console.log('lang = ' + this.props.filters.language);
        e.preventDefault();
        var changes = {
            city: this.refs.city.getDOMNode().value,
            day: this.state.day,
            language: this.state.language,
            zip: this.refs.zip.getDOMNode().value,
            distance: this.state.distance
        };
        this.props.submit(changes);
    },
    onLanguageChange: function(event){
        this.setState({language: event.target.value});
    },
    onDayChange: function(event){
        this.setState({day: event.target.value});
    },
    onDistanceChange: function(event){
        this.setState({ distance: event.target.value });
    },
    render: function() {
        return (
            <div className='form-filter'>
                <div>
                    <span>Day</span>
                    <select ref='day' value={this.props.filters.day} onChange={this.onDayChange} >
                        <option value=''>All</option>
                        <option value='Sunday'>Sunday</option>
                        <option value='Monday'>Monday</option>
                        <option value='Tuesday'>Tuesday</option>
                        <option value='Wednesday'>Wednesday</option>
                        <option value='Thursday'>Thursday</option>
                        <option value='Friday'>Friday</option>
                        <option value='Saturday'>Saturday</option>
                    </select>
                </div>
              <div>
                    <span>City</span>
                    <input type="text" ref="city" defaultValue={this.props.filters.city} />
                </div>
                <div>
                    <span>Zipcode</span>
                    <input ref='zip' type='text' placeholder='zip' />
                </div>
                <span>Max distance (in miles) from you</span>
                <select ref='distance' value={this.props.filters.distance} onChange={this.onDistanceChange} >
                    <option value=''>No max</option>
                    <option value='800'>.5</option>
                    <option value='1600'>1</option>
                    <option value='3200'>2</option>
                    <option value='8000'>5</option>
                    <option value='1600'>10</option>
                    <option value='3200'>20</option>
                </select>

                <div>
                    <span>Language</span>
                    <input type="radio" name="language" onChange={this.onLanguageChange} value="English" defaultChecked={this.props.filters.language == 'English'} />English
                    <input type="radio" name="language" onChange={this.onLanguageChange} value="Spanish" defaultChecked={this.props.filters.language == 'Spanish'} />Spanish
                    <input type="radio" name="language" onChange={this.onLanguageChange} value="Portuguese" defaultChecked={this.props.filters.language == 'Portuguese'}/>Portuguese
                </div>
                <button onClick={this.filter}>Filter</button>
            </div>
        )
    }


});

module.exports = Form;
