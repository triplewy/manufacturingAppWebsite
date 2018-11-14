import React, { Component } from 'react';
import Users from '../Users/Users'
import FetchList from '../FetchList/FetchList'
import LineModal from '../Lines/LineModal'
import RegisterItem from './RegisterItem'
import './Register.css';

const url = process.env.REACT_APP_API_URL

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: []
    }

    this.fetchCompanies()
  }

  componentDidMount() {
    this.fetchCompanies()
  }

  fetchCompanies() {
    fetch(url + '/api/admin/companies', {
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'Unauthorized Access') {
        // this.setState({failedLogin: 1})
      } else {
        this.setState({companies: data})
      }
    })
    .catch(function(err) {
        console.log(err);
    })
  }

  render() {
    return (
      <div className='company'>
        <p>Register Users</p>
        <FetchList api_url={'/api/admin/unregisteredUsers/'} item={RegisterItem} companies={this.state.companies} title='Register' key='Register' />
      </div>
    );
  }
}
