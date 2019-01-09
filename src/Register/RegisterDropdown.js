import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap'
import Users from '../Users/Users'
import FetchList from '../FetchList/FetchList'
import LineModal from '../Lines/LineModal'
import './RegisterDropdown.css';

const url = process.env.REACT_APP_API_URL

export default class RegisterDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: -1,
      isAdmin: false,
      lines: [],
      selectedLines: []
    };

    this.renderCompanies = this.renderCompanies.bind(this)
    this.selectCompany = this.selectCompany.bind(this)

    this.fetchLines = this.fetchLines.bind(this)
    this.renderLines = this.renderLines.bind(this)
    this.selectLine = this.selectLine.bind(this)

    this.register = this.register.bind(this)
  }

  renderCompanies() {
    var renderedCompanies = [];
    if (this.props.companies.length > 0) {
      renderedCompanies = this.props.companies.map((item, index) => {
        return (
          <li onClick={this.selectCompany.bind(this, index)} key={index}>{item.name}</li>
        )
      })
    }
    return renderedCompanies
  }

  selectCompany(index) {
    this.setState({company: index}, () => this.fetchLines())
  }

  fetchLines() {
    fetch(url + '/api/admin/company/' + this.props.companies[this.state.company].companyId + '/lines', {
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.message === 'Unauthorized Access') {
        // this.setState({failedLogin: 1})
      } else {
        this.setState({lines: data})
      }
    })
    .catch(function(err) {
        console.log(err);
    })
  }

  renderLines() {
    var renderedLines = [];
    if (this.state.lines.length > 0) {
      renderedLines = this.state.lines.map((item, index) => {
        return (
          <li
            className={this.state.selectedLines.includes(index) ? 'selected' : 'notSelected'}
            onClick={this.selectLine.bind(this, index)}
            key={index}
          >
            <p>{'Line ' + item.name}</p>
          </li>
        )
      })
    }
    return renderedLines
  }

  selectLine(index) {
    var selectedLines = this.state.selectedLines
    if (selectedLines.includes(index)) {
      selectedLines.splice(selectedLines.indexOf(index), 1)
    } else {
      selectedLines.push(index)
    }
    this.setState({selectedLines: selectedLines})
  }

  register() {
    var lineIds = []
    for (var i = 0; i < this.state.selectedLines.length; i++) {
      lineIds.push(this.state.lines[this.state.selectedLines[i]].lineId)
    }
    console.log(lineIds);
    fetch(url + '/api/admin/registerUser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        userId: this.props.userId,
        companyId: this.props.companies[this.state.company].companyId,
        lineIds: lineIds,
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

  render() {
    return (
      <div className='dropdown' id='registerDropdown' style={{maxHeight: this.props.show ? '800px' : '0px'}}>
        <div>
          <p>Company:</p>
          <Dropdown id="selectCompany" open={this.state.open}>
            <Dropdown.Toggle>
              {this.state.company > -1 ? this.props.companies[this.state.company].name : 'Select Company'}
            </Dropdown.Toggle>
            <Dropdown.Menu className='profileMenu'>
              {this.renderCompanies()}
            </Dropdown.Menu>
          </Dropdown>
        </div>
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
        <div style={{flexDirection: 'column'}}>
          <p>Lines</p>
          <ul>
            {this.renderLines()}
          </ul>
        </div>
        <div className='registerButton' onClick={this.register}>
          <p>Register</p>
        </div>
      </div>
    );
  }
}
