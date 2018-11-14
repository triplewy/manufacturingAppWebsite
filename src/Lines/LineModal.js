import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'
import './LineModal.css';

const url = process.env.REACT_APP_API_URL

export default class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: '',
      availableMin: 0,
      morningShift: 8,
      eveningShift: 8
    };

    this.toggleModal = this.toggleModal.bind(this)
    this.submit = this.submit.bind(this)
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal})
  }

  submit() {
    fetch(url + '/api/admin/company/' + this.props.companyId + '/lines/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: this.state.name,
        availableMin: this.state.availableMin,
        morningShift: this.state.morningShift,
        eveningShift: this.state.eveningShift + 12
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
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div className='newButton' onClick={this.toggleModal}>
          <p style={{textAlign: 'center'}}>Add Line</p>
        </div>
        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title style={{textAlign: 'center'}}>Add Line</Modal.Title>
          </Modal.Header>
          <Modal.Body className='add'>
            <div>
              <p>Name:</p>
              <input value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
            </div>
            <div>
              <p>Available Minutes:</p>
              <input type="number" value={this.state.availableMin} onChange={(e) => this.setState({availableMin: e.target.value})} />
            </div>
            <div>
              <p>Morning Shift Start:</p>
              <input type="number" value={this.state.morningShift} onChange={(e) => this.setState({morningShift: e.target.value})} />
              <p>AM</p>
            </div>
            <div>
              <p>Evening Shift Start:</p>
              <input type="number" value={this.state.eveningShift} onChange={(e) => this.setState({eveningShift: e.target.value})} />
              <p>PM</p>
            </div>
            <ul>
            </ul>
            <button onClick={this.submit} disabled={this.state.name.length === 0} style={{backgroundColor: this.state.name.length === 0 ? '#ccc' : '#9EDFB5'}}>Submit</button>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
