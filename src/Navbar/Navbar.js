import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import settingsIcon from '../Images/settings-icon.png'
import './Navbar.css';

const url = process.env.REACT_APP_API_URL

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.logout = this.logout.bind(this)
  }

  logout() {
    fetch(url + '/api/auth/logout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'Unauthorized Access') {
        // this.setState({failedLogin: 1})
      } else {
        if (data.message === 'success') {
          window.location.reload();
        } else {
        }
      }
    })
    .catch(function(err) {
        console.log(err);
    })
  }

  render() {
    return (
      <div className='navbar'>
        <Link to='/' className='title'>Streamline</Link>
        <Link to='/register' className='register'>Non registered users</Link>
        {this.props.loggedIn ?
          <Dropdown id="logout" open={this.state.open} onToggle={() => {this.setState({open: !this.state.open})}} pullRight>
            <Dropdown.Toggle>
              <img src={settingsIcon} id='settingsIcon' />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <li onClick={this.logout}>Logout</li>
            </Dropdown.Menu>
          </Dropdown>
          :
          null
        }

      </div>
    );
  }
}
