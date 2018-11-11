import React, { Component } from 'react';
import './Login.css';

const url = process.env.REACT_APP_API_URL

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.login = this.login.bind(this)
  }

  login(e) {
    fetch(url + '/api/auth/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(res => {
      if (res.status === 401) {
        return {message: 'not logged in'}
      } else {
        return res.json()
      }
    })
    .then(data => {
      console.log(data);
      if (data.message === 'not logged in') {
        // this.setState({failedLogin: 1})
      } else {
        this.props.loggedIn()
      }
    })
    .catch(function(err) {
        console.log(err);
    });
  }

  render() {
    return (
      <div className='login'>
        <p>Streamline</p>
        <input placeholder='Username' value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}/>
        <input type='password' placeholder='Password' value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}
