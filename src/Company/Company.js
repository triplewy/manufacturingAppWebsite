import React, { Component } from 'react';
import Users from '../Users/Users'
import Lines from '../Lines/Lines'
import FetchList from '../FetchList/FetchList'
import ImportModal from '../ImportModal/ImportModal'
import './Company.css';

const url = process.env.REACT_APP_API_URL

export default class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0
    };

    this.toggleTab = this.toggleTab.bind(this)
  }

  toggleTab(index) {
    this.setState({tab: index})
  }

  render() {
    const params = this.props.location.state
    return (
      <div className='company'>
        <p>{params.name}</p>
        <ImportModal companyId={params.companyId} />
        <div className='tabs'>
          <button style={{boxShadow: this.state.tab === 0 ? '0 1px 0 0 #337ab7' : 'none'}} onClick={this.toggleTab.bind(this, 0)}>Users</button>
          <button style={{boxShadow: this.state.tab === 1 ? '0 1px 0 0 #337ab7' : 'none'}} onClick={this.toggleTab.bind(this, 1)}>Lines</button>
          <button style={{boxShadow: this.state.tab === 2 ? '0 1px 0 0 #337ab7' : 'none'}} onClick={this.toggleTab.bind(this, 2)}>Machines</button>
        </div>
        {this.state.tab ?
          this.state.tab === 1 ?
            <FetchList api_url={'/api/admin/company/' + params.companyId + '/lines'} title='Line' key='lines' />
            :
            <FetchList api_url={'/api/admin/company/' + params.companyId + '/machines'} title='Machine' companyId={params.companyId} key='machines' />
          :
          <FetchList api_url={'/api/admin/company/' + params.companyId + '/users'} title='User' key='users' />
        }
      </div>
    );
  }
}
