import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import settingsIcon from '../Images/settings-icon.png'
import './Navbar.css';

const url = process.env.REACT_APP_API_URL

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };


  }

  render() {
    return (
      <div className='navbar'>
        <Link to='/' className='title'>Streamline</Link>
        <button>
          <img src={settingsIcon} />
        </button>
      </div>
    );
  }
}
