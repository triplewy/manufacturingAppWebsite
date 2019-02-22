import React, { Component } from 'react';
import Users from '../Users/Users'
import Lines from '../Lines/Lines'
import FetchList from '../FetchList/FetchList'
import NotificationModal from '../NotificationModal/NotificationModal'
import ImportModal from '../ImportModal/ImportModal'
import MachineModal from '../MachineModal/MachineModal'
import LineModal from '../Lines/LineModal'
import FileSaver from 'file-saver';
import './Company.css';

const url = process.env.REACT_APP_API_URL

export default class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0
    };

    this.toggleTab = this.toggleTab.bind(this)
    this.exportCSV = this.exportCSV.bind(this)
  }

  toggleTab(index) {
    this.setState({tab: index})
  }

  exportCSV() {
    fetch(url + '/api/admin/company/' + this.props.location.state.companyId + '/export/csv', {
      credentials: 'include',
      headers: {
        'Content-Disposition': 'attachment; filename=downtime.csv filename*=downtime.csv'
      }
    })
    .then(res => res.blob())
    .then(data => {
      FileSaver.saveAs(data, 'downtime.csv');
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    const params = this.props.location.state
    return (
      <div className='company'>
        <p>{params.name}</p>
        <ImportModal companyId={params.companyId} />
        <button onClick={this.exportCSV}>Export CSV</button>
        <NotificationModal companyId={params.companyId} />
        <div className='tabs'>
          <button style={{boxShadow: this.state.tab === 0 ? '0 1px 0 0 #337ab7' : 'none'}} onClick={this.toggleTab.bind(this, 0)}>Users</button>
          <button style={{boxShadow: this.state.tab === 1 ? '0 1px 0 0 #337ab7' : 'none'}} onClick={this.toggleTab.bind(this, 1)}>Lines</button>
          <button style={{boxShadow: this.state.tab === 2 ? '0 1px 0 0 #337ab7' : 'none'}} onClick={this.toggleTab.bind(this, 2)}>Machines</button>
        </div>
        {this.state.tab ?
          this.state.tab === 1 ?
            <div>
              <LineModal companyId={params.companyId} />
              <FetchList api_url={'/api/admin/company/' + params.companyId + '/lines'} title='Line' key='lines' />
            </div>
            :
            <div>
              <MachineModal companyId={params.companyId} />
              <FetchList api_url={'/api/admin/company/' + params.companyId + '/machines'} title='Machine' companyId={params.companyId} key='machines' />
            </div>
          :
          <Users companyId={params.companyId} />
          // <FetchList api_url={'/api/admin/company/' + params.companyId + '/users'} title='User' key='users' />
        }
      </div>
    );
  }
}
