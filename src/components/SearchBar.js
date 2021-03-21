import React, { Component } from 'react';
import Select from 'react-select'



class SearchBar extends Component {
    
    handleChange = option => this.props.handleIngredientsChange(option, this.props.category)
 
    render() {
        return (
            <Select
                isMulti
                options={this.props.list}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={this.handleChange}
            />
        )
    }
}

export default SearchBar;