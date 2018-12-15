import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import Login from './Auth/Login'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import Company from './Company/Company'
import Register from './Register/Register'

const url = process.env.REACT_APP_API_URL

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };

    this.sessionLogin = this.sessionLogin.bind(this)
    this.loggedIn = this.loggedIn.bind(this)
  }

  componentDidMount() {
    this.sessionLogin()
  }

  sessionLogin() {
    fetch(url + '/api/sessionLogin', {
      method: 'GET',
      credentials: 'include',
    })
    .then(res => {
      console.log(res);
      return res.json()
    })
    .then(data => {
      console.log(data);
      if (data.message === 'not logged in') {
        this.setState({loggedIn: false})
      } else {
        this.setState({loggedIn: true})
      }
    })
    .catch((error) => {
      console.error(error);
    })
  }

  loggedIn() {
    this.setState({loggedIn: true})
  }

  render() {
    const PrivateRoute = ({component: Component, ...rest}) => (
      <Route {...rest} render={(props) => (this.state.loggedIn ? <Component {...props}/> : <Redirect to={{pathname: '/', state: {from: props.location}}} /> )} />
    )
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar loggedIn={this.state.loggedIn} />
            <Switch>
              <Route exact path='/' render={(props) => this.state.loggedIn ? <Home {...props}/> : <Login {...props} loggedIn={this.loggedIn}/>} />
              <PrivateRoute exact path='/company/:companyId' component={Company}/>
              <PrivateRoute exact path='/register' component={Register} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
