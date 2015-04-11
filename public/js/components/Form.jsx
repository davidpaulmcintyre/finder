/** @jsx React.DOM */
var React = require('react');

var Form = React.createClass({
    /*getInitialState: function() {
        return {
            day: 'Tuesday',
            language: 'Spanish',
            city: '',
            zip: ''
        };
    },*/
    //getDefaultProps: function(){
    //    return {
    //        day: 'All'
    //    }
    //},
    filter: function(e) {
        e.preventDefault();
        var changes = {
            city: this.refs.city.getDOMNode().value,
            day: this.refs.day.getDOMNode().value,
            language: this.state.language,
            zip: this.refs.zip.getDOMNode().value
    }
        this.props.submit(changes);
    },
    onLanguageChange: function(event){
        this.setState({language: event.target.value});
    },
    render: function() {
        return (
            <div className='form-filter'>
                <div>
                    <span>Day</span>
                    <select ref='day' value={this.props.filters.day} >
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
