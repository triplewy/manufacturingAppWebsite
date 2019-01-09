import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap'
import LineList from '../Lines/LineList'
import './UserDropdown.css';

const url = process.env.REACT_APP_API_URL

export default class UserDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      isAdmin: false
    };

    this.fetchUser = this.fetchUser.bind(this)
    this.selectLine = this.selectLine.bind(this)

    this.save = this.save.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.show && this.props.show !== prevProps.show) {
      this.fetchUser()
    }
  }

  fetchUser() {
    fetch(url + '/api/admin/user=' + this.props.userId, {
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'Unauthorized Access') {
        // this.setState({failedLogin: 1})
      } else {
        console.log(data);
        if (data.length > 0) {
          var lineIds = []
          for (var i = 0; i < data.length; i++) {
            lineIds.push(data[i].lineId)
          }
          this.setState({lines: lineIds, isAdmin: data[0].isAdmin})
        }
      }
    })
    .catch(function(err) {
        console.log(err);
    });
  }

  selectLine(id) {
    var lineIds = this.state.lines
    if (lineIds.includes(id)) {
      lineIds.splice(lineIds.indexOf(id), 1)
    } else {
      lineIds.push(id)
    }
    this.setState({lines: lineIds})
  }

  save() {
    fetch(url + '/api/admin/editUser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        userId: this.props.userId,
        lineIds: this.state.lines,
        isAdmin: this.state.isAdmin
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.message === 'Unauthorized Access') {
        // this.setState({failedLogin: 1})
      } else {
        if (data.message === 'success') {

        } else {

        }
      }
    })
    .catch(function(err) {
        console.log(err);
    })
  }

  delete() {
    fetch(url + '/api/admin/deleteUser', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        userId: this.props.userId,
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.message === 'Unauthorized Access') {
        // this.setState({failedLogin: 1})
      } else {
        if (data.message === 'success') {

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
      <div className='dropdown' id='userDropdown' style={{maxHeight: this.props.show ? '1000px' : '0px'}}>
        <div>
          <p>Is Admin?</p>
          <Dropdown id="selectCompany" open={this.state.open}>
            <Dropdown.Toggle>
              {this.state.isAdmin ? 'Yes' : 'No'}
            </Dropdown.Toggle>
            <Dropdown.Menu className='profileMenu'>
              <li onClick={() => this.setState({ isAdmin : true })}>Yes</li>
              <li onClick={() => this.setState({ isAdmin : false })}>No</li>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {
          this.props.show ?
          <LineList companyId={this.props.companyId} lines={this.state.lines} selectLine={this.selectLine}/>
          :
          null
        }
        <div>
          <button className="save" onClick={this.save}>Save</button>
          <button className="delete" onClick={this.delete}>Delete User</button>
        </div>
      </div>
    )
  }
}
