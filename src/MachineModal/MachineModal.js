import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'
import './MachineModal.css';

const url = process.env.REACT_APP_API_URL

export default class MachineModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      lines: [],
      name: '',
      line: '',
      icon_url: ''
    };

    this.toggleModal = this.toggleModal.bind(this)
    this.fetchLines = this.fetchLines.bind(this)
    this.renderLines = this.renderLines.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    this.fetchLines()
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal})
  }

  fetchLines() {
    fetch(url + '/api/admin/company/' + this.props.companyId + '/lines', {
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
          <option value={item.name} key={item.id}>{'Line ' + item.name}</option>
        )
      })
    }
    return renderedLines
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({line: e.target.value})
  }

  submit() {
    fetch(url + '/api/admin/companies/' + this.props.companyId + '/machines/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: this.state.name,
        line: this.state.line,
        icon_url: this.state.icon_url
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'success') {
        this.setState({showModal: false})
      } else {
      }
    })
    .catch(function(err) {
        console.log(err);
    });
  }

  render() {
    console.log(this.state.line);
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div className='newButton' onClick={this.toggleModal}>
          <p style={{textAlign: 'center'}}>Add Machine</p>
        </div>
        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title style={{textAlign: 'center'}}>Add Machine</Modal.Title>
          </Modal.Header>
          <Modal.Body className='add'>
            <div>
              <p>Name:</p>
              <input value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
            </div>
            <div>
              <p>Line:</p>
              <select onChange={this.handleChange}>
                {this.renderLines()}
              </select>
            </div>
            <div>
              <p>Icon Url:</p>
              <input value={this.state.icon_url} onChange={(e) => this.setState({icon_url: e.target.value})} />
            </div>
            <button onClick={this.submit} disabled={this.state.name.length === 0} style={{backgroundColor: this.state.name.length === 0 ? '#ccc' : '#9EDFB5'}}>Submit</button>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
