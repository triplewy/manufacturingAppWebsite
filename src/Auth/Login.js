import React, { Component } from 'react';
import './Login.css';

const url = process.env.REACT_APP_API_URL

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',

      tab: 0,

      signupUsername: '',
      signupPassword: '',
      signupConfirmPassword: ''
    };

    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
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

  signup() {
    fetch(url + '/api/auth/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username: this.state.signupUsername,
        password: this.state.signupPassword
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.message === 'not logged in') {
        // this.setState({failedLogin: 1})
      } else {
        window.location.reload()
      }
    })
    .catch(function(err) {
        console.log(err);
    });
  }

  render() {
    return (
      <div>
        <div className='tabs'>
          <button style={{boxShadow: this.state.tab === 0 ? '0 1px 0 0 #337ab7' : 'none'}} onClick={() => {this.setState({tab: 0})}}>Login</button>
          <button style={{boxShadow: this.state.tab === 1 ? '0 1px 0 0 #337ab7' : 'none'}} onClick={() => {this.setState({tab: 1})}}>Signup</button>
        </div>
        {this.state.tab ?
          <div className='login'>
            <input placeholder='Username' value={this.state.signupUsername} onChange={(e) => this.setState({signupUsername: e.target.value})}/>
            <input type='password' placeholder='Password' value={this.state.signupPassword} onChange={(e) => this.setState({signupPassword: e.target.value})}/>
            <input type='password' placeholder='Confirm Password' value={this.state.signupConfirmPassword} onChange={(e) => this.setState({signupConfirmPassword: e.target.value})}/>
            <button onClick={this.signup}>Signup</button>
          </div>
          :
          <div className='login'>
            <input placeholder='Username' value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}/>
            <input type='password' placeholder='Password' value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
            <button onClick={this.login}>Login</button>
          </div>
        }

      </div>

    );
  }
}
