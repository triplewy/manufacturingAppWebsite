import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'
import './LineModal.css';

const url = process.env.REACT_APP_API_URL

export default class LineModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      lineName: '',
      machines: []
    };

    this.toggleModal = this.toggleModal.bind(this)
    this.fetchMachines = this.fetchMachines.bind(this)
    this.renderMachines = this.renderMachines.bind(this)
  }

  componentDidMount() {
    this.fetchMachines()
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal})
  }

  fetchMachines() {
    fetch(url + '/api/admin/company/' + this.props.companyId + '/machines', {
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.message === 'Unauthorized Access') {
        // this.setState({failedLogin: 1})
      } else {
        this.setState({machines: data})
      }
    })
    .catch(function(err) {
        console.log(err);
    })
  }

  renderMachines() {
    var renderedMachines = [];
    if (this.state.machines.length > 0) {
      renderedMachines = this.state.machines.map((item, index) => {
        return (
          <li key={item.machineId}>
            <p>{item.name}</p>
          </li>
        )
      })
    }

    return renderedMachines
  }

  render() {
    return (
      <li>
        <div style={{flex: 1}} onClick={this.toggleModal}>
          <p style={{textAlign: 'center'}}>New Line +</p>
        </div>
        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title style={{textAlign: 'center'}}>Add Line</Modal.Title>
          </Modal.Header>
          <Modal.Body className='addLine'>
            <div>
              <p>Line #:</p>
              <input value={this.state.lineName} onChange={(e) => this.setState({lineName: e.target.value})}/>
            </div>
            <ul>
              {this.renderMachines()}
            </ul>
            <button>Submit</button>
          </Modal.Body>
        </Modal>
      </li>
    )
  }
}
