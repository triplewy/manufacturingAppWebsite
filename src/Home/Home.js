import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AddCompanyModal from './AddCompanyModal'
import './Home.css';

const url = process.env.REACT_APP_API_URL

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: []
    };

    this.fetchCompanies = this.fetchCompanies.bind(this)
    this.renderCompanies = this.renderCompanies.bind(this)
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
    });
  }

  renderCompanies() {
    var renderedCompanies = [];
    if (this.state.companies.length > 0) {
      renderedCompanies = this.state.companies.map((item, index) => {
        return (
          <Link to={{ pathname: '/company/' + item.companyId, state: {...item} }} key={index}>
            <p style={{flex: 1}}>{item.name}</p>
            <p>{new Date(item.createdDate).toLocaleDateString('en-US')}</p>
          </Link>
        )
      })
    }
    return renderedCompanies
  }

  render() {
    return (
      <div className='home'>
        <p style={{marginBottom: 30}}>Companies</p>
        <AddCompanyModal />
        <ul>
          {this.renderCompanies()}
        </ul>
      </div>
    );
  }
}
