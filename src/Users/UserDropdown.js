import React, { Component } from 'react';
import './UserDropdown.css';

const url = process.env.REACT_APP_API_URL

export default class UserDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className='dropdown' id='userDropdown' style={{maxHeight: this.props.show ? '600px' : '0px'}}>

      </div>
    )
  }
}
